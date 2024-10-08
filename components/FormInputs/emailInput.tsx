import { updateFormData } from "@/redux/slices/onboardingStudentsSlice";
import { CheckCircle2, LoaderPinwheel, XCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

interface EmailInputProps {
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isRequired?: boolean | string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
}

const popularEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
];

const EmailInput: React.FC<EmailInputProps> = ({
  name,
  register,
  errors,
  isRequired = "",
  className = "",
  defaultValue = "",
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const formData = useSelector((store: any) => store.onboarding.formData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTyping && inputValue && !inputValue.includes("@")) {
      setSuggestions(
        popularEmailDomains.map((domain) => `${inputValue}@${domain}`)
      );
      setCheckEmail(false);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, isTyping]);

  useEffect(() => {
    if (suggestions.length > 0 && focusedSuggestionIndex >= 0) {
      suggestionRefs.current[focusedSuggestionIndex]?.focus();
    }
  }, [focusedSuggestionIndex, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    setFocusedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const FData = {
      ...formData,
      [name]: suggestion,
    };
    // handleCheckEmail(suggestion);
    dispatch(updateFormData(FData));
    setInputValue(suggestion);
    setIsTyping(false);
    setSuggestions([]);
  };

  const handleCheckEmail = async (email: string) => {
    setCheckEmail(true);
    setStatus("Checking email...");
    try {
      const url = `https://validect-email-verification-v1.p.rapidapi.com/v1/verify?email=${email}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "153747d565msh53c507f0a9fe569p163487jsne35155ec2a1e",
          "x-rapidapi-host": "validect-email-verification-v1.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (data.status === "valid") {
        setStatus(data.status);
      } else {
        setStatus(data.status);
      }
    } catch (error) {
      setStatus("Error checking email");
    }
    setCheckEmail(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedSuggestionIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedSuggestionIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
          );
          break;
        case "Tab":
          e.preventDefault();
          setFocusedSuggestionIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case " ":
        case "Enter":
          if (focusedSuggestionIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestions[focusedSuggestionIndex]);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={className}>
      <div className="mt-2 relative">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="absolute right-1 text-xs top-0">
          <div className="flex items-center justify-between gap-2">
            {status.toUpperCase()}
            {status === "valid" ? (
              <CheckCircle2 size={17} className="text-emerald-500" />
            ) : status === "invalid" ? (
              <XCircle size={17} className="text-red-500" />
            ) : (
              checkEmail && (
                <LoaderPinwheel
                  size={17}
                  className="text-gray-500 animate-spin"
                />
              )
            )}
          </div>
        </div>
        <input
          value={inputValue.toLocaleLowerCase()}
          {...register(name, { required: isRequired })}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="email"
          name={name}
          style={{ textTransform: "lowercase" }}
          id={name}
          autoComplete={name}
          className="block w-full rounded-sm py-2 lowercase text-gray-900 placeholder:pl-2 shadow-sm ring-1 ring-inset ring-slate-500 placeholder:text-gray-400 line-clamp-1 focus:ring-inset focus:ring-orange-700 dark:focus:ring-orange-500 sm:text-sm sm:leading-6 dark:bg-transparent md:placeholder:text-sm placeholder:text-xs pl-1 placeholder:capitalize placeholder:pr-2"
          placeholder={placeholder ? placeholder : "Type your email"}
        />
        {errors[name] && (
          <span className="text-sm text-red-600">
            {errors[name]?.message as string}
          </span>
        )}
        {/* {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                //@ts-ignore
                ref={(el) => (suggestionRefs.current[index] = el)}
                tabIndex={-1}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                  index === focusedSuggestionIndex ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    handleSuggestionClick(suggestion);
                  }
                }}
              >
                {suggestion.toLocaleLowerCase()}
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default EmailInput;
