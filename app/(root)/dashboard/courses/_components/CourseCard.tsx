"use client";

import { DELETE_COURSE } from "@/actions";
import AlertModal from "@/components/modals/AlertModal";
import { formatDateTime } from "@/lib/utils";
import { AssessmentCourses } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const CourseCard = ({ course }: { course: AssessmentCourses }) => {
  const [open, setOpen] = useState(false);
  const deleteCourse = useMutation({
    mutationFn: async (id: string) => {
      return DELETE_COURSE(id);
    },
    onSuccess: () => {
      toast.success("Course Deleted Successfully")
      setOpen(false)
    },
    onError: () => {
      toast.success(" Error Deleting Course")
      setOpen(false)
    },
  });
  const { isPending: loading, mutate } = deleteCourse;
  const handleDelete = async (id: string) => {
    mutate(id);
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(course.id)}
      />
      <div className="p-6 border shadow-lg rounded-md relative">
        <Link href={`/dashboard/courses/${course.id}`}>
          <div className="w-full items-center flex">
            <h2 className="text-gray-900 font-bold ">{course.name}</h2>
            <p className="ml-auto">
              {formatDateTime(course.createdAt as Date)}
            </p>
          </div>
          <hr className="w-full" />
          <div className="w-full flex items-center gap-3">
            <p className="mt-3 border rounded-md bg-secondary p-1">
              Duration: {course.examTime}
            </p>
          </div>
          <div className="mt-4">
            <p className="w-full p-2 bg-secondary rounded-md mb-2 text-black">
              Instructions
            </p>
            <p className="line-clamp-3">{course.instructions}</p>
          </div>
          <div className="mt-2">
            <p className="w-full p-2 bg-secondary rounded-md mb-2 text-black">
              Description
            </p>
            <p className="line-clamp-3">{course.description}</p>
          </div>
        </Link>
        <div className="absolute bottom-3  transition-all  duration-700 right-2 bg-primary p-2   rounded-full shadow-lg flex items-center backdrop-blur-md ">
            <button
              onClick={() => setOpen(true)}
              className="text-white font-bold"
            >
              <Trash2Icon />
            </button>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
