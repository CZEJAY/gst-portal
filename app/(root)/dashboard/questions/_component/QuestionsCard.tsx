"use client";
import { DELETE_QUESTION } from "@/actions";
import AlertModal from "@/components/modals/AlertModal";
import { Question } from "@prisma/client";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Course = {
  id: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  assessmentsId: string | null;
  examTime: string | null;
  instructions: string | null;
  description: string | null;
  studentsId: string | null;
  participantsId: string[];
};

type Props = {
  data: Question & {
    course: Course;
  };
};

const QuestionsCard = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePush = (link: string) => {
    router.push(link);
  };

  const handleDelete = async (id: string) => {
    // Delete the question
    try {
        setLoading(true)
        const deleted = await DELETE_QUESTION(id)
        if(deleted?.id){
            toast.success("Question deleted.")
        }
        setOpen(false)
    } catch (error: any) {
        console.log("Error deleting question", error)
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="border rounded-md p-4 relative flex-col flex shadow-md hover:shadow-lg transition-all duration-150">
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(props.data.id)}
      />
      <div className="">
        <h2 className="text-md line-clamp-1 border-b mb-2 font-bold">
          {props.data.question}
        </h2>

        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            Course: {props.data.course.name}
          </p>{" "}
          |
          <p className="text-sm text-gray-500">
            Duration: {props.data.course.examTime || "NTS"}
          </p>{" "}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="">
            <p className="text-sm text-gray-500">Instructions</p>
            <p className="text-sm text-gray-500 line-clamp-2 italic">
              {props.data.course.instructions || "No Instructions"}
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-sm text-gray-500 line-clamp-2 italic">
              {props.data.course.description || "No Description"}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 group hover:w-20 transition-all  duration-700 right-2 bg-primary p-1 px-2  rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md hover:scale-100">
        <div className="">
          <button
            onClick={() =>
              handlePush(
                `/dashboard/questions/${props.data.course.id}/${props.data.id}`
              )
            }
            className="text-white font-bold"
          >
            <PenLineIcon />
          </button>
        </div>

        <div className="hidden group-hover:flex">
          <button
            onClick={() => setOpen(true)}
            className="text-white font-bold"
          >
            <Trash2Icon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsCard;
