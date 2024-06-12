"use client"
import React from "react";
import { useSelector } from "react-redux";

export default function Step({ step }: {step: {stepNumber: number, title: string}}) {
  const { stepNumber, title } = step;
  // @ts-ignore
  const currentStep = useSelector((store) => store?.onboarding?.currentStep);
  return (
    <div className="flex flex-col md:flex-row items-center gap-3  p-1 ">
      <div
        className={`w-8  h-8  text-slate-50 border border-slate-50 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
          stepNumber === currentStep ? "bg-orange-900 border-0" : ""
        }`}
      >
        {stepNumber}
      </div>
      <div className="flex-col flex  justify-center">
        <h4 className="text-slate-200 text-sm uppercase ">Step {stepNumber}</h4>
        <h3 className="uppercase text-sm text-white font-bold">{title}</h3>
      </div>
    </div>
  );
}
