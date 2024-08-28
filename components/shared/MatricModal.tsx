import { CheckCircle, Loader, LucideThumbsUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { Input } from "../ui/input";
import { toast } from "sonner";
import { validateMatricNumber } from "@/lib/utils";
import { GETSTUDENT } from "@/actions";

interface SuccessModalProps {
  isOpen: boolean;
  onChange: () => void;
  OnSuccess: () => void;
}

const MatricModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onChange,
  OnSuccess,
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({ success: "", error: "" });

  const handlePrint = async () => {
    try {
      setLoading(true);
      setValidation({error: "", success: ""})
      if (validateMatricNumber(value)) {
        const data = await GETSTUDENT(value);
        if (data.student) {
          setValidation({
            success: `${data.student.firstName} data fetched! Redirecting...`,
            error: "",
          });
          setTimeout(() => {
            router.push("/print/" + data.student.id, );
          }, 3000);
        } else {
          setValidation({
            success: "",
            error: "Matric Number does not exist",

          });
        }
      } else {
        setValidation({ success: "", error: "Invalid Matric Number" });
      }
    } catch (error: any) {
      setValidation({ success: "", error: "Something went  wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              <div className="text-center">
                <h2 className="text-lg tracking-widest font-bold text-black">
                  Enter Matric Number
                </h2>
                <p className="text-sm text-blue-500">
                  Please enter the matric below.
                </p>
              </div>
              <DialogDescription>
                <div className="flex justify-center flex-col items-center mt-1">
                  <div className="space-y-2">
                    <Input
                      value={value}
                      onChange={(value) => setValue(value.target.value)}
                      className="caret-blue-800 text-black"
                      placeholder="00/AB/CD/00"
                    />
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
                  <div className="md:mt-2 flex items-center mt-auto gap-4">
                    <button
                      type="button"
                      onClick={onChange}
                      className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                      {loading ? <Loader className="animate-spin" /> : "Print"}
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatricModal;
