"use client";
import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

type Props = {
  onClick?: () => void
}

const Modal: React.FC<Props> = ({
  onClick
}) => {
  const INITIAL_MAINTENANCE_PERIOD = 20 * 3600 * 1000; // 9 hours in milliseconds
  const RESET_MAINTENANCE_PERIOD = 10 * 3600 * 1000; // 2 hours in milliseconds

  const [savedEndTime, setSavedEndTime] = useLocalStorage("maintenanceEndTime", "");

  const getMaintenanceEndTime = () => {
    if (savedEndTime) {
      return parseInt(savedEndTime, 10);
    } else {
      const endTime = new Date().getTime() + INITIAL_MAINTENANCE_PERIOD;
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
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);

      // If the time is up, reset the maintenance time for another 2 hours
      if (Object.keys(timeLeft).length === 0) {
        const newEndTime = new Date().getTime() + RESET_MAINTENANCE_PERIOD;
        setSavedEndTime(newEndTime.toString());
      }
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
    <div className=" flex items-center justify-center max-w-[600px] min-w-[500px]">
      <div className="bg-white rounded-lg flex flex-col shadow-lg max-w-[600px]  w-full p-6">
        {/* <div>
          <img src="/uniuyo-logo.png" alt="logo" className="mx-auto w-28" />
        </div> */}
        <h2 className="text-blue-600 text-xl font-bold capitalize  text-center mb-3">
         CBT Portal
        </h2>
        <p className="p-2 text-center font-semibold text-md">
          Portal under maintainance
        </p>
        <p className="mb-2 text-center font-mono font-semibold text-md">
          Maintenance ends in:{" "}
        </p>
        <p className="text-lg font-serif text-center mb-4 text-emerald-600 ">
          {timerComponents.length ? timerComponents : <span className="">Time&apos;s up!</span>}
        </p>
        <button onClick={onClick} className="px-4 tracking-wider py-2 border-2 border-blue-500 text-black hover:text-white rounded-lg hover:bg-blue-600">
          Thank You!
        </button>
      </div>
    </div>
  );
};

export default Modal;
