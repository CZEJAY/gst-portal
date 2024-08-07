
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const pattern = /^\d{2}\/[A-Z]{2,4}(\/[A-Z]{2,4})?(\/[A-Z]{2,4})?\/\d*$/;

export function validateMatricNumber(input: string) {
    return pattern.test(input);
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string) {
    return emailRegex.test(email);
}


export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const hashPassword = async ({ password, salt = 10 }: {password: string, salt?: number}) => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};


export const decodeBase64 = (base64String: string) => {
  try {
    // Replace URL-safe characters with standard Base64 characters
    let base64 = base64String.replace(/_/g, '/').replace(/-/g, '+');

    // Add padding characters if needed
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    // Decode the base64 string
    const binaryString = atob(base64);

    // Convert binary string to byte array
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    return base64;
  } catch (error) {
    console.error('Failed to decode base64 string:', error);
    return null;
  }
};

export const encodeToBase64 = (input: any) => {
  // Check if the input is a string or binary data
  if (typeof input === 'string') {
    // For a string, simply use btoa
    return btoa(input);
  } else if (input instanceof Uint8Array) {
    // For binary data, convert the byte array to a string and then encode
    let binaryString = '';
    input.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString);
  } else {
    throw new Error('Unsupported input type for base64 encoding');
  }
};

export function extractPublicId(url: string): string | null {
  const regex = /\/v\d+\/([^\/]+\/[^\/]+)\./;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

const smoothPercentageChange = (currentValue: number, newValue: number, smoothingFactor: number): number => {
  return currentValue + smoothingFactor * (newValue - currentValue);
};

export const calculatePercentageChange = (
  countToday: number,
  countYesterday: number,
  previousPercentage: number = 0,
  smoothingFactor: number = 0.1
): number => {
  let percentageChange: number;

  if (countYesterday === 0) {
    percentageChange = 100;
  } else {
    percentageChange = ((countToday - countYesterday) / countYesterday) * 100;
  }

  // Clamp the value between 0 and 100
  percentageChange = clamp(percentageChange, 0, 100);

  // Smooth the change
  percentageChange = smoothPercentageChange(previousPercentage, percentageChange, smoothingFactor);

  return percentageChange;
};


export function calculatePercentageChange1(countToday: number, countYesterday: number) {
  if (countYesterday === 0) {
    // Handle the case where countYesterday is 0 to avoid division by zero
    return countToday > 0 ? 100 : 0;
  }

  const difference = countToday - countYesterday;
  const percentageChange = (difference / countYesterday) * 100;

  return percentageChange;
}

// Example usage:
// const countToday = 120;
// const countYesterday = 100;
// const percentageChange = calculatePercentageChange(countToday, countYesterday);
// console.log(`Percentage change: ${percentageChange}%`);
