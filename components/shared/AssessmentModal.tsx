import { CheckCircle, Loader, Loader2, LucideThumbsUp, X } from "lucide-react";
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
import { CREATECOURSE, GETSTUDENT } from "@/actions";
import { Label } from "../ui/label";

interface SuccessModalProps {
  isOpen: boolean;
  onChange: () => void;
  OnSuccess?: () => void;
}

const AssessmentModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onChange,
  OnSuccess,
}) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({ success: "", error: "" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setValidation({ error: "", success: "" });
      const res = await CREATECOURSE({ name: value });
      if (res.name) {
        setValidation({
          success: `Course (${res.name}) created successfully`,
          error: "",
        })
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
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="course" className="text-left">
                Courses
              </Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id="course"
                className="col-span-3"
              />
            </div>
            <div
              className={`text-center text-sm  ${
                validation.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {validation.success ? validation.success : validation.error}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>
              {
                loading ? <Loader2 className="animate-spin" /> : "Create"
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssessmentModal;
