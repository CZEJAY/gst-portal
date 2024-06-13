import React from "react";
import StepForm from "../MultiStepForm/StepForm";
import Steps from "../MultiStepForm/Steps";
import NavBar from "../navBar";

export default function FormPage() {
  const steps = [
    {
      stepNumber: 1,
      title: "Personal Info",
    },
    {
      stepNumber: 2,
      title: "Facial Authentication",
    },
    {
      stepNumber: 3,
      title: "Submit and Confirmation",
    },
  ];
  return (
    <>
    <NavBar />
    <div className="p-4 relative overflow-hidden min-h-[700px] bg-orange-600 " >
      <div className="mx-auto w-full max-w-7xl  p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-6 grid grid-cols-12 gap-4">
        {/* Steps */}
        <Steps steps={steps} />
        {/* Form */}
        <div className="rounded-lg col-span-full grid-cols-2 lg:col-span-8 ">
          <StepForm />
        </div>
      </div>
    </div>
    </>
  );
}
