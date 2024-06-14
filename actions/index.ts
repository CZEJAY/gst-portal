"use server";

import { auth, signIn, signOut } from "@/auth";
import { FormData } from "@/components/MultiStepForm/StepForms/PersonalInfoForm";
import { FormattedStudent } from "@/context/zustand";
import cloudinary from "@/lib/cloudinary";
import prismadb from "@/lib/prisma";
import { ValidationError, extractPublicId, hashPassword } from "@/lib/utils";
import Registrar from "@/models/Registrar";
import Student from "@/models/Students";
import { students } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function SignInSVA() {
  await signIn();
}
export async function SignOutSVA() {
  await signOut();
}

export const CHECKPHONE = async (phone: string) => {
  try {
    const existingPhone = await prismadb.students.findUnique({
      where: {
        phone,
      },
    });

    if (existingPhone) {
      throw new ValidationError("Phone number already exists");
    }
    return {
      message: "Phone number is available",
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error; // Re-throw the validation error to be handled by the frontend
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
    }
  }
};

export const CHECKMATRICNUMBER = async (matricNumber: string) => {
  try {
    const existingMatricNumber = await prismadb.students.findUnique({
      where: {
        matricNumber,
      },
    });
    console.log(existingMatricNumber);
    if (existingMatricNumber) {
      throw new ValidationError("Matric number already exists");
    }
    return {
      message: "Matric number is available",
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error; // Re-throw the validation error to be handled by the frontend
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
    }
  }
};

export const SIGNUP = async (data: { username: string; password: string }) => {
  const { username, password } = data;
  try {
    if (!username || !password) {
      throw new ValidationError("Username and Password is required.");
    }

    const user = await prismadb.registrars.findUnique({
      where: {
        name: username,
      },
    });
    if (user) {
      throw new ValidationError("Username already exist.");
    }
    const hashedPassword = await hashPassword({ password });
    const newUser = await prismadb.registrars.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error; // Re-throw the validation error to be handled by the frontend
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error"); // Throw a generic error to avoid exposing internal details
    }
  }
};

export const CHECKEXISTENCE = async (matricNumber: string) => {
  try {
    if (!matricNumber) {
      throw new ValidationError("Matric number must be provided.");
    }

    const existingStudent = await prismadb.students.findFirst({
      where: {
        matricNumber,
      },
    });
    if (existingStudent) {
      throw new ValidationError(
        "Student already exists with provided matric number."
      );
    }

    return {
      message: "Student does not exist",
    };
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error");
    }
  }
};

export const CLOUDINARYUPLOAD = async (data: string) => {
  try {
    const result = await cloudinary.cloudinary.uploader.upload(
      data,
      { folder: "gst" },
      function (err, result) {
        if (err) {
          console.log(err);
        }
      }
    );
    if (result) {
      return { message: "Image uploaded", data: result };
    }
  } catch (error: any) {
    console.log("Error Uploading thro cloudinary => ", error);
    throw new ValidationError("Something went wrong");
  }
};

export const CLOUDINARYDELETE = async (data: string) => {
  try {
    const result = await cloudinary.cloudinary.uploader.destroy(data, {
      type: "upload",
      resource_type: "image",
    });
    if (result) {
      console.log(`${data} deleted from cloudinary...`);
      return { message: "Image deleted", data: result };
    }
  } catch (error: any) {
    console.log("Error Uploading thro cloudinary => ", error);
    throw new ValidationError("Something went wrong");
  }
};

export const CREATESTUDENT = async ({
  data,
  userId,
}: {
  data: students;
  userId: string;
}) => {
  try {
    // Check if matric number already exists
    const existingMatricNumber = await prismadb.students.findUnique({
      where: { matricNumber: data.matricNumber },
    });
    if (existingMatricNumber) {
      throw new ValidationError("Matric number already exists");
    }

    // Find registrar by userId
    const registrar = await prismadb.registrars.findUnique({
      where: { id: userId },
    });
    if (!registrar) {
      throw new ValidationError("Registrar user not found");
    }

    // Create a new student
    const student = await prismadb.students.create({
      data: {
        ...data,
        fingerPrint: null,
        registrar: userId,
      },
    });
    revalidatePath("/dashboard");
    return student;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      console.log(`Validation error: ${error.message}`);
      throw error;
    } else {
      console.log(`Internal server error: ${error.message}`);
      throw new Error("Internal server error");
    }
  }
};

export const GETSTUDENT = async (matricNumber: string) => {
  try {
    const session = await auth()
    
    const student = session?.user?.name === "caleb" ? await prismadb.students.findUnique({
      where: { matricNumber },
      include: {
        registrarRel: true
      }
    }) : await prismadb.students.findUnique({
      where: { matricNumber },
    });
    let studentsCount;
    if(student?.registrar){
      const registrar = await prismadb.students.findMany({
        where: {
          registrar: student.registrar
        }
      })
      studentsCount = registrar.length
    }

    const formattedStudent: FormattedStudent = {
      student,
      studentsCount
    }
    
      return JSON.parse(JSON.stringify(formattedStudent))
  } catch (error) {
    console.error("Failed to fetch student data:", error);
    return null
  }
};

export const DELETESTUDENT = async (matricNumber: string) => {
  try {
    const student = await prismadb.students.delete({
      where: { matricNumber },
    })
    const publicId = extractPublicId(student.image)
    const deletedImage = await CLOUDINARYDELETE(publicId as string)
    console.log("Image deleted => ", deletedImage?.message)
    revalidatePath("/dashboard")
  } catch (error: any) {
    console.log("Could not delete Student", error)
    throw error
  }
}
