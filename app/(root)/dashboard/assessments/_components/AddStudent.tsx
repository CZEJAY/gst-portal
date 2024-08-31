"use client";
import { ADDTOSCHEDULE, GETSTUDENT } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateMatricNumber } from "@/lib/utils";
import { students } from "@prisma/client";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddStudent = ({ data }: { data: any }) => {
  const [value, setValue] = useState("");
  const [aPass, setAPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({ success: "", error: "" });
  const [student, setStudent] = useState<students | null>();

  console.log(data)

  const handlePrint = async () => {
    try {
      setLoading(true);
      setValidation({ error: "", success: "" });
      if (validateMatricNumber(value)) {
        const data = await GETSTUDENT(value);
        if (data.student) {
          setValidation({
            success: `${data.student.firstName} data fetched!`,
            error: "",
          });
          setStudent(data.student);
          setAPass(data.student.phone);
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
  const handleAdd = async () => {
    try {
      setLoading(true);
      setValidation({ error: "", success: "" });
      const severDTO = await ADDTOSCHEDULE(
        student?.id as string,
        data.id,
        aPass
      );

      if (severDTO) {
        setValidation({ success: "Student Added to Schedule", error: "" });
        setTimeout(() => {
          setValidation({ error: "", success: "" });
          setValue("");
          setAPass("");
          setStudent(null);
        }, 3000);
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Schedule Student</h1>
      <div className="mt-8">
        <div className="flex items-center gap-2">
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
              {validation.success ? validation.success : validation.error}
            </div>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="bg-blue-500 text-white font-bold p-1 rounded"
          >
            {loading ? <Loader className="animate-spin" /> : "Search"}
          </button>
        </div>
        {student && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">Student Information</h2>
            <div className="">
              <p className="text-sm">
                Name:{" "}
                {student.surName +
                  " " +
                  student.firstName +
                  " " +
                  student.otherName}
              </p>

              <p className="text-sm">Matric Number: {student.matricNumber}</p>

              <div className="flex flex-col ">
                <p>Password</p>
                <div className="flex gap-2">
                  <Input
                    value={aPass}
                    onChange={(value) => setAPass(value.target.value)}
                    className="caret-blue-800 text-black"
                  />
                  <Button onClick={handleAdd}>
                    {loading ? <Loader className="animate-spin" /> : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
