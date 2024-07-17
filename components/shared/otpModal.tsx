
import { CheckCircle, LucideThumbsUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface SuccessModalProps {
  isOpen: boolean;
  onChange: () => void;
  OnSuccess: () => void;
}

const OTPModal: React.FC<SuccessModalProps> = ({ isOpen, onChange, OnSuccess }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState({ success: "", error: "" });

  useEffect(() => {
    if (value.length >= 6) {
      if (process.env.OTP) {
        setValidation({ success: "OTP is not set", error: "" });
      }
      if (value === "113005") {
        setValidation({ success: "Valid token!", error: "" });
        OnSuccess();
      } else {
        setValidation({ success: "", error: "Invalid token!" });
      }
    }
  }, [value]);

  const handlePrint = () => {};

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              <div className="text-center">
                <h2 className="text-lg tracking-widest font-bold text-black">
                  Enter Authurization Key
                </h2>
                <p className="text-md font text-blue-500">
                  Please enter the key below.
                </p>
              </div>
              <DialogDescription>
                <div className="flex justify-center flex-col items-center mt-1">
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={6}
                      value={value}
                      onChange={(value) => setValue(value)}
                      className="caret-blue-800"
                    >
                      <InputOTPGroup className="text-black caret-blue-800">
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={0}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={1}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={2}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={3}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={4}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    <div
                      className={`text-center text-sm  ${
                        validation.success ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {validation.success
                        ? validation.success
                        : validation.error}
                    </div>
                  </div>
                  <div className="md:mt-2 flex items-center mt-auto flex-col">
                    <button
                      type="button"
                      onClick={onChange}
                      className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>
          <div></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OTPModal;
