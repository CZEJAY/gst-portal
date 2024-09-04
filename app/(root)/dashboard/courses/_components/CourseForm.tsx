"use client";

import { UPDATE_COURSE } from "@/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AssessmentCourses } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/shared/use-toast";

type Props = {
  course: AssessmentCourses;
  id: string
};

const formSchema = z.object({
  instructions: z.string().min(2, {
    message: "Instructions must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Course must be at least 2 characters.",
  }),
  examTime: z.string().min(2, {
    message: "Exam Time must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

const CourseForm = ({ course, id }: Props) => {
  const [validation, setValidation] = useState({ success: "", error: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructions: course.instructions as string,
      name: course.name,
      examTime: course.examTime as string,
      description: course.description as string,
    },
  });

  const useUpdateCourse = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return UPDATE_COURSE(values, id); // Assuming UPDATE_COURSE is a function that accepts values
    },
    onSuccess: () => {
      setValidation({ success: "Course updated successfully", error: "" });
      toast({
        title: "Course updated successfully",
        description:  "Course updated successfully",
      })
    },
    onError: () => {
      setValidation({ success: "", error: "Error updating course" });
      toast({
        title: "Error updating course",
        description: "Error updating course",
      })
    },
  });

  const { isPending: isLoading, mutate } = useUpdateCourse;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setValidation({ error: "", success: "" });
    mutate(values);
  };

  return (
    <div>
      <h1>Course Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input placeholder="course code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="examTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="45 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea className="h-48" placeholder="Instructions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="h-48" placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={`text-center text-sm ${
                validation.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {validation.success || validation.error}
            </div>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin mr-2" />} Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
