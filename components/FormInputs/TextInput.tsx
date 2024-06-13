import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Info from '../shared/info';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import clsx from 'clsx';
import { cn } from '@/lib/utils';

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean | string;
  type?: string;
  className?: string;
  defaultValue?: string;
  isPhone?: boolean;
  isPass?: boolean;
  placeholder?: string;
  isUpper?: boolean;
  formValues?: Record<string, any>;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = '',
  type = 'text',
  className = 'col-span-1 sm:col-span-2',
  defaultValue = '',
  isPhone = false,
  isPass = false,
  placeholder,
  isUpper = false,
  formValues,
}) => {
  const formData = useSelector((store: any) => store.onboarding.formData);
  const dispatch = useDispatch();
  const maxCharacter = 11;

  return (
    <div className={"col-span-1 sm:col-span-2"}>
      <div className="flex items-center justify-between w-full">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        {/* {isPhone && (
          <div className="inline-flex gap-2 cursor-pointer">
            <Info label="Use phone number as password" />
            <label htmlFor="isPassword" className="relative inline-flex items-center cursor-pointer" title="Use phone number as password">
              <input
                id="isPassword"
                type="checkbox"
                className="sr-only peer"
                onChange={(e) => handleChange(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-orange-300 rounded-full peer  peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-orange-600"></div>
            </label>
          </div>
        )} */}
      </div>
      <div className="mt-2 relative">
        <input
          {...register(name, { required: isRequired })}
          maxLength={isPhone ? maxCharacter : undefined}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className={
            "block w-full rounded-sm py-2 text-gray-900 placeholder:pl-2 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 line-clamp-1 focus:ring-inset focus:ring-orange-700 dark:focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-transparent placeholder:text-xs text-clip pl-1 placeholder:capitalize placeholder:pr-2 " +
            (isUpper && 'uppercase')
          }
          placeholder={
            placeholder ? placeholder : `Type the ${label.toLowerCase()}`
          }
        />
        {isPhone && (
          <div className="absolute top-5 hidden md:block right-5 -translate-y-1/2 text-gray-400">
            {maxCharacter - (formValues?.phone?.length ?? 0)} / {maxCharacter}
          </div>
        )}
        {errors[name] && (
          <span className="text-sm text-red-600">{errors[name]?.message as string}</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
