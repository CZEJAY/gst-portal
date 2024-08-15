"use client"
import { setCurrentStep, updateFormData } from "@/redux/slices/onboardingStudentsSlice";
import { students } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Print({StudentData}: {StudentData?: students }) {
  const reduxFormData = useSelector((store: any) => store.onboarding.formData);
  const [isPrinting, setIsPrinting] = useState(false);
  const [formData, setFormData] = useState<any>(null)

  const router = useRouter()

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(StudentData){
      setFormData(StudentData)
    }else {
      setFormData(reduxFormData)
    }
  }, [formData, StudentData])

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };
  const handleClose = () => {
    window.location.assign("/register")
  };

  return (
    <div className="w-screen justify-center h-screen flex items-start">
      <div className="fixed bottom-1/3 flex items-center justify-between gap-4">
      <button
        hidden={isPrinting}
        type="button"
        onClick={handlePrint}
        className="bg-blue-900   font-bold py-2 px-4 rounded text-white"
      >
        Print
      </button>
      <button
        hidden={isPrinting}
        type="button"
        onClick={handleClose}
        className="bg-blue-900   font-bold py-2 px-4 rounded text-white"
      >
        Close
      </button>
      

      </div>
      <form className="w-fit  relative px-5 py-3  min-w-[700px] min-h-[400px] border-[4px] border-blue-500">
        <div className="mb-8 relative w-full flex items-center justify-center">
          <div className="mx-auto self-center">
          <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-full">
            <img
              src={formData?.image || ""}
              width={200}
              height={200}
              loading="eager"
              alt="user"
              className="object-cover w-full h-full transform scale-105 "
            />
          </div>
            <p className="text-xl text-center font-bold">
              {formData?.matricNumber || "N/A"}
            </p>
          </div>
          <div className="flex flex-1 gap-4 -mt-8 items-center justify-end  shrink-0">
            <div className="flex-col -mt-9 text-center">
              <h1 className="text-[25px] tracking-widest mt-8  leading-5  uppercase font-bold text-gray-900">
                university of uyo
              </h1>
              <p className="text-lg tracking-tight mt-1 uppercase leading-tight font-bold">
                GST - Biometric Registration
              </p>
              <p className="text-md mt-1 uppercase leading-tight font-serif font-bold">
                second semester
              </p>
              <p className="text-sm uppercase font-serif font-bold">
                2023/2024 session
              </p>
            </div>
            <Image width={200} height={200} src="/uniuyo-logo.png" alt="logo" className="w-32" />
          </div>
        </div>
        <div className="flex w-full -mt-6 flex-col">
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-xl font-bold w-full flex items-center border-b">
                Name:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData?.surName?.toUpperCase()},{" "}
                  {formData?.firstName?.toUpperCase()}{" "}
                  {formData?.otherName?.toUpperCase()} ({formData?.gender})
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Faculty:{" "}
                <span className="font-medium ml-auto text-sm ">
                  {formData?.faculty || "N/A"}
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Department:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData?.department || "N/A"}
                </span>
              </p>
              <p className="text-xl font-bold w-full flex items-center border-b">
                Level:{" "}
                <span className="font-medium ml-auto text-sm">
                  {formData?.level || "N/A"}
                </span>
              </p>
            </div>
            <div className="border-2 border-black rounded w-52 h-32 flex items-center justify-center">
              <img
                src={"/finger.png"}
                className="rounded-full w-36"
                width={90}
                alt="fingerprint"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4 border-b border-blue-500">
            <p className="italic font-bold text-xl">
              Congratulations! See you on exams day.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
