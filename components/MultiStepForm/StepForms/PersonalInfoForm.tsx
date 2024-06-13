"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster, toast } from "sonner";

import SelectInput from "../../FormInputs/SelectInput";
import SelectInputCourse from "../../FormInputs/SelectInputCourse";

import { YOS, course, facultiesAndDepartment, gender } from "../../../constants";
import { setCurrentStep, updateFormData } from "../../../redux/slices/onboardingStudentsSlice";
import { ValidationError, validateEmail, validateMatricNumber } from "../../../lib/utils";
import TextInput from "@/components/FormInputs/TextInput";
import NavButtons from "@/components/FormInputs/NavButtons";
import { CHECKEXISTENCE, CHECKMATRICNUMBER, CHECKPHONE } from "@/actions";

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
}

const PersonalInfoForm: React.FC = () => {
  const currentStep = useSelector((store: any) => store.onboarding.currentStep);
  const formData = useSelector((store: any) => store.onboarding.formData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        !formValues.otherName ||
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

      const {message} = await CHECKEXISTENCE(data.matricNumber as string)

      if (message) {
        toast.success(message);
        const FData = {
          ...data,
          ...formData,
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

  const [departments, setDepartments] = useState<string[]>([formData.department || ""]);

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
          const {message} = await CHECKPHONE(formValues.phone)
          if (message) {
            toast.message(message);
            clearErrors("phone");
          }
        } catch (error: any) {
          if (error) {
            setError("phone", {
              message: error.message,
            });
          }
        }
      }
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [formValues.phone]);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (formValues.matricNumber) {
        try {
          if (!validateMatricNumber(formValues.matricNumber)) {
            toast.error("Please enter a valid matric number.");
            return;
          }
          const {message} = await CHECKMATRICNUMBER(formValues.matricNumber)
          if (message) {
            toast.success(message);
            clearErrors("matricNumber");
          }
        } catch (error: any) {
          if (error) {
            setError("matricNumber", {
              message: error.message,
            });
          }
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
      <form className=" md:px-12 py-4" onSubmit={handleSubmit(processData)}>
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
            isRequired="Other Name is required"
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
          <TextInput
            label="Matric Number"
            type="text"
            name="matricNumber"
            placeholder="Enter matriculation number"
            register={register}
            isRequired="Matric Number is required"
            errors={errors}
            className="col-span-2"
          />
        </div>
        <NavButtons loading={loading} />
      </form>
    </>
  );
};

export default PersonalInfoForm;
