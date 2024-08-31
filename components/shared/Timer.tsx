"use client"

import React, { useEffect, useState } from "react";

interface TimerProps {
  initialTime: string; // e.g., "45 min"
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const parseTime = (time: string): number => {
    const match = time.match(/(\d+)\s*min/);
    if (!match) {
      throw new Error("Invalid time format");
    }
    const minutes = parseInt(match[1], 10);
    return minutes * 60; // convert minutes to seconds
  };

  const [timeInSeconds, setTimeInSeconds] = useState(parseTime(initialTime));
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeInSeconds > 0) {
      const interval = setInterval(() => {
        setTimeInSeconds((prev) => prev - 1);
        setProgress((timeInSeconds / parseTime(initialTime)) * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeInSeconds, initialTime]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "8px solid",
        borderColor: `hsl(${progress}, 100%, 50%)`, // Change color based on progress
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      {formatTime(timeInSeconds)}
    </div>
  );
};

export default Timer;
