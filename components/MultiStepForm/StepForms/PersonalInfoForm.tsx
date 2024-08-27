"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "sonner";

import SelectInput from "../../FormInputs/SelectInput";
import SelectInputCourse from "../../FormInputs/SelectInputCourse";

import {
  YOS,
  course,
  facultiesAndDepartment,
  gender,
} from "../../../constants";
import {
  setCurrentStep,
  updateFormData,
} from "../../../redux/slices/onboardingStudentsSlice";
import {
  ValidationError,
  validateEmail,
  validateMatricNumber,
} from "../../../lib/utils";
import TextInput from "@/components/FormInputs/TextInput";
import NavButtons from "@/components/FormInputs/NavButtons";
import { CHECKEXISTENCE, CHECKMATRICNUMBER, CHECKPHONE } from "@/actions";
import EmailInput from "@/components/FormInputs/emailInput";

export interface FormData {
  surName?: string;
  firstName?: string;
  otherName?: string;
  gender?: string;
  faculty?: string;
  department?: string;
  level?: string;
  phone?: string;
  matricNumber?: string;
  [key: string]: any; // Add index signature for dynamic keys
}
export type FormDataType = {
  surName?: string;
  firstName?: string;
  otherName?: string;
  gender?: string;
  faculty?: string;
  department?: string;
  level?: string;
  phone?: string;
  matricNumber?: string;
  [key: string]: any; // Add index signature for dynamic keys
};

const PersonalInfoForm: React.FC = () => {
  const currentStep = useSelector((store: any) => store.onboarding.currentStep);
  const formData = useSelector((store: any) => store.onboarding.formData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [chem121, setChem121] = useState<string | any>("")
  const [chem128, setChem128] = useState<string | any>("")

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      ...formData,
    },
  });

  const processData = async (data: FormData) => {
    try {
      setLoading(true);

      if (!validateMatricNumber(formValues.matricNumber || "")) {
        setError("matricNumber", {
          message: "Please enter a valid matric number.",
        });
        return;
      }

      if (
        !formValues.matricNumber ||
        !formValues.firstName ||
        !formValues.surName ||
        !formValues.gender ||
        !formValues.level ||
        !formValues.faculty ||
        !formValues.phone ||
        !formValues.department
      ) {
        toast.error("Please Fill in all the fields.", {
          position: "top-center",
        });
        return;
      }

      
      
      const { message } = await CHECKEXISTENCE(data.matricNumber as string);

      if (message) {
        toast.success(message);
        const FData = {
          ...data,
          ...formData,
          courses: [chem121, chem128],
        };
        dispatch(updateFormData(FData));
        dispatch(setCurrentStep(currentStep + 1));
      }
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formValues = watch();

  const handleCourse1Check = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chem121 = e.target.id == "chem121" && e.target.checked ? "CHM 121" : null
    setChem121(String(chem121))
   
  }
  const handleCourse2Check = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chem128 = e.target.id == "chem128" && e.target.checked ? "CHM 128" : null
    setChem128(String(chem128))
  }

  const [departments, setDepartments] = useState<string[]>([
    formData.department || "",
  ]);

  useEffect(() => {
    if (formValues.faculty) {
      setDepartments([
        `${
          formValues.faculty === "Select Faculty"
            ? "Please select a faculty to populate."
            : `Select Department in ${formValues.faculty}`
        }`,
        ...(facultiesAndDepartment.find(
          (item) => item.faculty === formValues.faculty
        )?.departments || []),
      ]);
    }
  }, [formValues.faculty]);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (formValues.phone && formValues.phone.length === 11) {
        try {
          const { message, error } = await CHECKPHONE(formValues.phone);
          if (message) {
            toast.success(message);
            clearErrors("phone");
          }
          if (error) {
            setError("phone", {
              message: error,
            });
          }
        } catch (error: any) {
          toast.error("Something went wrong");
        }
      }
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [formValues.phone]);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (formValues.matricNumber) {
        try {
          if (!validateMatricNumber(formValues.matricNumber.toUpperCase())) {
            toast.error("Please enter a valid matric number.");
            return;
          }
          const { message, error } = await CHECKMATRICNUMBER(
            formValues.matricNumber
          );
          if (message) {
            toast.success(message);
            clearErrors("matricNumber");
          }
          if (error) {
            setError("matricNumber", {
              message: error,
            });
          }
        } catch (error: any) {
          toast.error("Something went wrong!");
        }
      }
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [formValues.matricNumber]);

  const faculties = [
    "Select Faculty",
    ...facultiesAndDepartment.map((item) => item.faculty),
  ];

  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <form
        className=" md:px-12 px-2 py-4"
        onSubmit={handleSubmit(processData)}
      >
        <div className="mb-8">
          <h5 className="text-md md:text-3xl font-bold text-gray-900">
            Personal info
          </h5>
          <p className="text-sm md:text-lg font-semibold">
            Please fill every field in the form below.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 ">
          <TextInput
            label="Surname"
            name="surName"
            register={register}
            isRequired="Surname is required"
            errors={errors}
            isUpper
          />
          <TextInput
            label="First Name"
            name="firstName"
            register={register}
            isRequired="First Name is required"
            errors={errors}
            isUpper
          />
          <TextInput
            label="Other Name?"
            name="otherName"
            register={register}
            errors={errors}
            isUpper
          />
          <SelectInputCourse
            label="Select your Gender"
            name="gender"
            register={register}
            options={gender}
          />
          <TextInput
            label="Phone Number"
            name="phone"
            type="number"
            register={register}
            isRequired="Phone Number is required"
            errors={errors}
            formValues={formValues}
            isPhone
          />
          <EmailInput
            name="email"
            register={register}
            isRequired="Email Adress is required"
            errors={errors}
            defaultValue={formData.email}
          />
          <SelectInput
            label="Faculty"
            name="faculty"
            register={register}
            options={faculties}
          />
          <SelectInput
            label="Department"
            name="department"
            register={register}
            options={departments || []}
          />
          <SelectInputCourse
            label="Year of study"
            name="level"
            register={register}
            options={YOS}
          />
          <div className="col-span-1 flex-col  md:min-w-full flex items-start border p-2 rounded-md gap-4">
            <h2 className="font-bold text-current border-b w-full">Select Course</h2>
            <div className="flex items-center gap-3">
              <input  onChange={(e) => handleCourse1Check(e)} type="checkbox" name="chem121" id="chem121" />
              <label htmlFor="chem121" className="text-md">CHM 121</label>
            </div>
            <div className="flex items-center gap-3">
              <input  onChange={(e) => handleCourse2Check(e)} type="checkbox" name="chem128" id="chem128" />
              <label htmlFor="chem128" className="text-md">CHM 128</label>
            </div>
          </div>
          <TextInput
            label="Matric Number"
            type="text"
            name="matricNumber"
            placeholder="Enter matriculation number"
            register={register}
            isRequired="Matric Number is required"
            className="col-span-2"
            errors={errors}
            // className="col-span-2"
          />
        </div>
        <NavButtons loading={loading} />
      </form>
    </>
  );
};

export default PersonalInfoForm;
