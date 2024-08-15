"use client";
import {
  setCurrentStep,
  updateFormData,
} from "@/redux/slices/onboardingStudentsSlice";
import { students } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Print({ StudentData }: { StudentData?: students }) {
  const reduxFormData = useSelector((store: any) => store.onboarding.formData);
  const [isPrinting, setIsPrinting] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (StudentData) {
      setFormData(StudentData);
    } else {
      setFormData(reduxFormData);
    }
  }, [formData, StudentData]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };
  const handleClose = () => {
    window.location.assign("/register");
  };

  return (
    <div className="w-screen justify-center h-screen flex items-start">
      <div className="fixed bottom-0 flex items-center justify-between gap-4">
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
      <form className="w-fit  relative px-5 py-3  min-w-[700px] min-h-[400px] pt-20">
        <div className="mb-8 relative w-full flex flex-col items-center justify-center">
          <div className="flex border-b w-full flex-1 flex-col gap-4 mb-10 pb-4 items-center justify-end  shrink-0">
            <Image
              width={200}
              height={200}
              src="/uniuyo-logo.png"
              alt="logo"
              className="w-32"
            />
            <h1 className="text-center text-xl font-bold">
              1st Semester GST Supplementary Exams Slip
            </h1>
          </div>
          <div className="self-start gap-5 flex items-start">
            <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-md border-4 p-2 border-blue-500">
              <img
                src={formData?.image || ""}
                width={200}
                height={200}
                loading="eager"
                alt="user"
                className="object-cover w-full h-full transform scale-105 "
              />
            </div>
            <div className="flex gap-2 items-start flex-col">
              <p className="text-xl text-center font-bold tracking-wider">
                {formData?.surName?.toUpperCase()},{" "}
                {formData?.firstName?.toUpperCase()}{" "}
                {formData?.otherName?.toUpperCase()}
              </p>
              <p className="text-xl font-bold w-full flex gap-2 items-center">
                Matric Number:{" "}
                <span className="font-bold ml-auto text-lg text-blue-900">
                  {formData?.matricNumber || "N/A"}
                </span>
              </p>
              <p className="text-xl font-bold w-full gap-2 flex items-center">
                Email:{" "}
                <span className="font-bold text-lg  text-blue-900">
                  {formData?.email || "N/A"}
                </span>
              </p>
              <p className="text-xl font-bold w-full gap-2 flex items-center">
                Phone:{" "}
                <span className="font-bold text-lg text-blue-900">
                  {formData?.phone || "N/A"}
                </span>
              </p>
              <p className="text-xl font-bold w-full gap-2 flex items-center">
                Gender:{" "}
                <span className="font-bold text-lg text-blue-900">
                  {formData?.gender || "N/A"}
                </span>
              </p>
            </div>
          </div>
          <hr className="w-full mt-10" />
        </div>
        <div className="flex w-full mt-2 flex-col">
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1 flex-1 ">
              <h2 className="text-blue-600 ">Exam Date</h2>
              <p className="text-xl font-bold w-full flex items-center border-b pb-3">
                {formData?.examDate || "Monday, 30-August-2024, 09:35 AM"}
              </p>
            </div>
          </div>
          <div className="grid gap-4 mt-4 border-b pb-4 border-blue-500">
            <h1 className="text-blue-600 text-lg">Application Details</h1>
            <div className="grid grid-cols-2">
              <div className="col-span-1 flex flex-col gap-8">
                <div className="">
                  <p className="text-sm font-bold">
                    Faculty
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {
                      formData?.faculty || "N/A"
                    }
                  </p>
                </div>
                <div className="">
                  <p className="text-sm font-bold">
                    Current Level
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {
                      formData?.level || "N/A"
                    }
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-8">
                <div className="">
                  <p className="text-sm font-bold">
                    Department
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    {
                      formData?.department || "N/A"
                    }
                  </p>
                </div>
                <div className="">
                  <p className="text-sm font-bold">
                    Application Date
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    {
                      format(
                        new Date(formData.createdAt),
                        "MMMM do, yyyy, hh:mm:ss a"
                      ) || "N/A"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
