"use client";
import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const Modal: React.FC = () => {
  
  const MAINTENANCE_PERIOD = 5 * 3600 * 1000; // 10 hours in milliseconds

  const getMaintenanceEndTime = () => {
    const [savedEndTime, setSavedEndTime] = useLocalStorage("maintenanceEndTime", "");
    if (savedEndTime) {
      return parseInt(savedEndTime, 10);
    } else {
      const endTime = new Date().getTime() + MAINTENANCE_PERIOD;
      setSavedEndTime(endTime.toString());
      return endTime;
    }
  };

  const maintenanceEndTime = getMaintenanceEndTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = maintenanceEndTime - now;

    let timeLeft: { hours?: number; minutes?: number; seconds?: number } = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [maintenanceEndTime]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <span key={interval}>
        {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
      </span>
    );
  });
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg flex flex-col shadow-lg max-w-lg w-full p-6">
        <div>
          <img src="/uniuyo-logo.png" alt="logo" className="mx-auto w-28" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-10">
          Biometric Portal Maintenance
        </h2>
        <p className="mb-4 text-center font-semibold text-md">
          The Biometric portal is currently under maintenance. Please check back
          later. We apologize for any inconvenience caused.
        </p>
        <p className="mb-2 text-center font-mono font-semibold text-md">
          Maintenance ends in:{" "}
        </p>
        <p className="text-lg font-serif text-center mb-4 text-emerald-600 ">
        {timerComponents.length ? timerComponents : <span className="">Time's up!</span>}
        </p>
        <button className="px-4 tracking-wider py-2 bg-orange-900 text-white rounded hover:bg-orange-600">
          Thank You!
        </button>
      </div>
    </div>
  );
};

export default Modal;
