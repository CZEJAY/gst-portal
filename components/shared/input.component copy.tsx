"use client"
import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputBoxProps {
  name: string;
  type: string;
  id: string;
  value?: string;
  placeholder?: string;
  icon?: string;
  disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        disabled={disabled}
        type={type === "password" && showPassword ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        className="input-box disabled:opacity-80 placeholder:text-md md:placeholder:text-xl font-bold text-lg md:text-xl font-serif"
        required
      />
      {icon === "password" && !showPassword && (
        <EyeIcon
          onClick={() => setShowPassword(!showPassword)}
          size={18}
          className="input-icon left-[auto] right-4 cursor-pointer"
        />
      )}
      {icon === "password" && showPassword && (
        <EyeOff
          onClick={() => setShowPassword(!showPassword)}
          size={18}
          className="input-icon left-[auto] right-4 cursor-pointer"
        />
      )}
    </div>
  );
};

export default InputBox;
