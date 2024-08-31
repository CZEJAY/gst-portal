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
import { defaultExamDescription, defaultExamInstructions } from "@/constants";
import { Textarea } from "../ui/textarea";

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
  const [loading, setLoading] = useState(false);

  type courseCreation = {
    [key: string]: string;
  };
  const [value, setValue] = useState<courseCreation>({});
  const [validation, setValidation] = useState({ success: "", error: "" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setValidation({ error: "", success: "" });
      const res = await CREATECOURSE({
        ...value,
        name: value.name,
        examTime: value.examTime,
      });

      if (res.name) {
        setValidation({
          success: `Course (${res.name}) created successfully`,
          error: "",
        });
      }
    } catch (error: any) {
      setValidation({ success: "", error: "Something went  wrong" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue({
      ...value,
      instructions: defaultExamInstructions.trim(),
      description: defaultExamDescription.trim(),
    });
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="course" className="text-left">
                Course Name
              </Label>
              <Input
                value={value.course}
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                id="course"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="examTime" className="text-left">
                ExamTime
              </Label>
              <Input
                value={value.examTime}
                onChange={(e) =>
                  setValue({ ...value, examTime: e.target.value })
                }
                id="examTime"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 py-4 w-full">
            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="instructions" className="text-left">
                Instructions
              </Label>
              <Textarea
                value={value.instructions}
                onChange={(e) =>
                  setValue({ ...value, instructions: e.target.value })
                }
                id="instructions"
                className="col-span-3 h-32"
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
                id="description"
                className="col-span-3 h-32"
              />
            </div>
          </div>
          <div
            className={`text-center text-sm  ${
              validation.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {validation.success ? validation.success : validation.error}
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssessmentModal;
