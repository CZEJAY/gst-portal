import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';

import {
  setCurrentStep,
  updateFormData,
} from '../../../redux/slices/onboardingStudentsSlice';

import SelectInput from '../../FormInputs/SelectInput';
import SelectInputCourse from '../../FormInputs/SelectInputCourse';
import {
  YOS,
  facultiesAndDepartment,
  gender,
} from '../../../constants';
import {
  validateEmail,
  validateMatricNumber,
} from '../../../lib/utils';
import TextInput from '@/components/FormInputs/TextInput';
import NavButtons from '@/components/FormInputs/NavButtons';
import { CHECKEXISTENCE, CHECKMATRICNUMBER, CHECKPHONE } from '@/actions';
import EmailInput from '@/components/FormInputs/emailInput';
import { addCourse, removeCourse } from '@/redux/slices/courseSlice';

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
  email?: string;
  [key: string]: any;
}

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: any) => state.onboarding.currentStep
  );
  const formData = useSelector(
    (state: any) => state.onboarding.formData
  );
  const [selectedCourses, setSelectedCourses] = useState(formData.courses || [])
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);

  const {
    register,
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

  const formValues = watch();

  useEffect(() => {
    if (formValues.faculty) {
      const facultyData = facultiesAndDepartment.find(
        (item) => item.faculty === formValues.faculty
      );
      setDepartments(facultyData ? facultyData.departments : []);
    }
  }, [formValues.faculty]);

  useEffect(() => {
    const validatePhone = setTimeout(async () => {
      if (formValues.phone && formValues.phone.length === 11) {
        try {
          const { message, error } = await CHECKPHONE(formValues.phone);
          if (message) {
            toast.success(message);
            clearErrors('phone');
          }
          if (error) {
            setError('phone', {
              message: error,
            });
          }
        } catch (error: any) {
          toast.error('Something went wrong while validating phone number.');
        }
      }
    }, 500);

    return () => clearTimeout(validatePhone);
  }, [formValues.phone, clearErrors, setError]);

  useEffect(() => {
    const validateMatric = setTimeout(async () => {
      if (formValues.matricNumber) {
        try {
          const matricNumber = formValues.matricNumber.toUpperCase();
          if (!validateMatricNumber(matricNumber)) {
            setError('matricNumber', {
              message: 'Please enter a valid matric number.',
            });
            return;
          }
          const { message, error } = await CHECKMATRICNUMBER(matricNumber);
          if (message) {
            toast.success(message);
            clearErrors('matricNumber');
          }
          if (error) {
            setError('matricNumber', {
              message: error,
            });
          }
        } catch (error: any) {
          toast.error('Something went wrong while validating matric number.');
        }
      }
    }, 500);

    return () => clearTimeout(validateMatric);
  }, [formValues.matricNumber, clearErrors, setError]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      if (!selectedCourses.includes(id)) {
        setSelectedCourses((prev: string[]) => [...prev, id]);
      }
    } else {
      setSelectedCourses((prev: string[]) => prev.filter((courseId) => courseId !== id));
    }
  };


  const processData = async (data: FormData) => {
    try {
      setLoading(true);

      

      if (
        !validateMatricNumber(data.matricNumber || '') ||
        !data.matricNumber ||
        !data.firstName ||
        !data.surName ||
        !data.gender ||
        data.level === "Select Level" || data.gender === "Gender" ||
        !data.level ||
        !data.faculty ||
        !data.phone ||
        !data.department ||
        !data.email ||
        selectedCourses.length === 0
      ) {
        if(data.level === "Select Level" || data.gender === "Gender"){
          setError("level", {
            message: "Please select a level"
          })
          setError("gender", {
            message: "Please select a Gender"
        })
        return
      }
        toast.error(
          'Please fill in all required fields and select at least one course.',
          {
            position: 'top-center',
          }
        );
        return;
      }

      const { message } = await CHECKEXISTENCE(data.matricNumber as string);

      if (message) {
        toast.success(message);
        const FData = {
          ...data,
          courses: selectedCourses,
        };
        dispatch(updateFormData(FData));
        dispatch(setCurrentStep(currentStep + 1));
      }
    } catch (error: any) {
      toast.error(
        error.message || 'An error occurred while processing your data.'
      );
    } finally {
      setLoading(false);
    }
  };

  const faculties = facultiesAndDepartment.map((item) => item.faculty);

  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <form
        className="md:px-12 px-4 py-6"
        onSubmit={handleSubmit(processData)}
      >
        <div className="mb-8">
          <h5 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h5>
          <p className="text-md text-gray-600">
            Please fill in all required fields below.
          </p>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
            label="Other Name"
            name="otherName"
            register={register}
            errors={errors}
            isUpper
          />
          <SelectInputCourse
            label="Gender"
            name="gender"
            register={register}
            errors={errors}
            options={gender}
          />
          <TextInput
            label="Phone Number"
            name="phone"
            type="tel"
            register={register}
            isRequired="Phone Number is required"
            errors={errors}
            formValues={formValues}
            isPhone
          />
          <EmailInput
            name="email"
            register={register}
            isRequired="Email Address is required"
            errors={errors}
          />
          <SelectInput
            label="Faculty"
            name="faculty"
            register={register}
            options={faculties}
            errors={errors}
          />
          <SelectInput
            label="Department"
            name="department"
            register={register}
            options={departments}
            disabled={!formValues.faculty}
            errors={errors}
          />
          <SelectInputCourse
            label="Year of Study"
            name="level"
            register={register}
            options={YOS}
            errors={errors}
          />
          <TextInput
            label="Matric Number"
            name="matricNumber"
            register={register}
            isRequired="Matric Number is required"
            errors={errors}
            isUpper
          />
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col border p-4 rounded-md">
              <h2 className="text-sm font-medium text-gray-900 mb-2">
                Select Courses
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="CHM 121"
                    checked={selectedCourses.includes('CHM 121')}
                    onChange={handleCourseChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="CHM 121" className="ml-2 text-sm text-gray-700">
                    CHM 121
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="CHM 128"
                    checked={selectedCourses.includes('CHM 128')}
                    onChange={handleCourseChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="CHM 128" className="ml-2 text-sm text-gray-700">
                    CHM 128
                  </label>
                </div>
                {/* Add more courses as needed */}
              </div>
              {selectedCourses.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Please select at least one course.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <NavButtons loading={loading} />
        </div>
      </form>
    </>
  );
};

export default PersonalInfoForm;
