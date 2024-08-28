import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { updateFormData } from "../../redux/slices/onboardingStudentsSlice";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Option {
  id: string | null;
  title: string;
}

interface SelectInputCourseProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
  options: Option[];
  multiple?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
}

const SelectInputCourse: React.FC<SelectInputCourseProps> = ({
  label,
  name,
  register,
  className = "col-span-1  md:min-w-full",
  options = [],
  multiple = false,
  disabled,
  errors
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((store: any) => store.onboarding.formData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const FDATA = {
      ...formData,
      [name]: e.target.value,
    };
    dispatch(updateFormData(FDATA));
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 w-full">
        <select
          {...register(name)}
          id={name}
          multiple={multiple} 
          name={name}
          className="block min-w-full rounded-md h-10 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 focus:ring-inset sm:max-w-xs text-xs md:text-sm sm:leading-6"
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map((option, i) => (
            <option key={i} value={option.id as string} disabled={i === 0} defaultValue={i === 0 ? option.id as string : ""} selected={i === 0}>
              {option.title}
            </option>
          ))}
        </select>
        {errors[name] && (
          <span className="text-sm text-red-600">{errors[name]?.message as string}</span>
        )}
      </div>
    </div>
  );
};

export default SelectInputCourse;
