import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SelectInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  className?: string;
  options: string[];
  multiple?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  register,
  className = "col-span-1 overflow-hidden",
  options = [],
  multiple = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 ">
        <select
          {...register(name)}
          id={name}
          multiple={multiple}
          name={name}
          className="block text-xs max-w-[150px] min-w-full rounded-md h-10 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-slate-500 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => (
            <option key={i} value={option} disabled={i === 0} defaultValue={i === 0 ? option : ""} selected={i === 0}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
