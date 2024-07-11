"use client"
import axios from "axios";
import NavButtons from "../../FormInputs/NavButtons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { ValidationError } from "@/lib/utils";
import Image from "next/image";
import { CREATESTUDENT } from "@/actions";
import SuccessModal from "@/components/shared/SuccessModal"
import { useSession } from "next-auth/react";
import { students } from "@prisma/client";

export default function FormConfirmation() {
  const formData: students = useSelector((store: any) => store.onboarding.formData); // Adjust the type as per your RootState
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<string | null>(null)
  const router = useRouter()
  const {data} = useSession()
  
  
  
  
  const processData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      if (
        !formData.image ||
        !formData.matricNumber ||
        !formData.firstName ||
        !formData.surName ||
        !formData.gender ||
        !formData.faculty ||
        !formData.department ||
        !formData.level ||
        !formData.phone
      ) {
        return toast.error("Please make sure to fill in all the fields in step one.", {
          position: "top-center",
        });
      }
      const updatedData: students = {
        ...formData,
        surName: formData.surName.toUpperCase(),
        firstName: formData.firstName.toUpperCase(),
        otherName: formData?.otherName?.toUpperCase() as string,
      };
      const response = await CREATESTUDENT({data:updatedData, userId:data?.user?.id as string})
      if (response) {
        console.log(response);
        setStudentId(response.id)
        setSuccess(true);
      }
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    router.push("/print");
  };

  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      {success && (
        <SuccessModal
          id={studentId as string}
          onChange={() => setSuccess(!success)}
          isOpen={success}
          firstname={formData.firstName}
          matricNumber={formData.matricNumber}
          othername={formData.otherName!}
          surname={formData.surName}
        />
      )}
      <form className="md:px-12 px-2 py-4" onSubmit={processData}>
        <div className="mb-8 relative">
          <h5 className="text-lg md:text-3xl font-bold text-gray-900">
            Confirm and Submit Data
          </h5>
          <p className="text-sm md:text-lg italic font-bold text-orange-700 ">
            Confirm if this is the data that you filled
          </p>
          {/* {!success && (
            <button
              type="button"
              onClick={handlePrint}
              className="bg-orange-900 absolute top-0 right-0 text-white font-bold py-2 px-4 rounded"
            >
              Print
            </button>
          )} */}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-full">
            <Image
              src={formData.image}
              width={200}
              height={200}
              loading="eager"
              alt="user"
              className="object-cover w-full h-full transform scale-105 "
            />
          </div>
          <div className="flex flex-col gap-1">
            {[
              { label: "Surname", value: formData.surName.toUpperCase() },
              { label: "Firstname", value: formData.firstName.toUpperCase() },
              { label: "Othername", value: formData.otherName!.toUpperCase() },
              { label: "Gender", value: formData.gender },
              { label: "Faculty", value: formData.faculty },
              { label: "Department", value: formData.department },
              { label: "Level", value: formData.level },
              { label: "Matric Number", value: formData.matricNumber },
              { label: "Phone Number", value: formData.phone },
              { label: "Email Address", value: formData.email?.toLocaleLowerCase() },
            ].map((item, index) => (
              <p
                key={index}
                className="text-sm font-bold w-full flex items-center border-b"
              >
                {item.label}:{" "}
                <span className="font-medium ml-auto line-clamp-1">
                  {item.value}
                </span>
              </p>
            ))}
            <p className="text-sm font-bold w-full flex items-center border-b">
              Fingerprint:{" "}
              <img
                src={"/finger.png"}
                width={40}
                className="rounded-full ml-auto w-10"
                alt="fingerprint"
                loading="eager"
              />
            </p>
          </div>
        </div>
        <NavButtons loading={loading} />
      </form>
    </>
  );
}
