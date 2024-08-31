"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, getCurrentHour } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CREATEASSESSMENT } from "@/actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AssessmentCourses } from "@prisma/client";
export type SelectedCorses = {
  id: string;
};
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Assessment name must be at least 2 characters.",
  }),
  chm121: z.boolean({}).default(false).optional(),
  chm128: z.boolean({}).default(false).optional(),
  startDate: z.date({
    required_error: "A  start date is required.",
  }),
  endDate: z.date({
    required_error: "An end date is required.",
  }),
  startTime: z.string(),
  endTime: z.string(),
});

export const AssessmentForm = ({
  courses,
}: {
  courses: AssessmentCourses[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: getCurrentHour(),
      endTime: "",
    },
  });
  
  const [loading, setIsLoading] = useState(false);
  const [selectedCourses, setCourses] = useState<SelectedCorses[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setIsLoading(true);
      const response = await CREATEASSESSMENT(values, selectedCourses);
      if (response.name) {
        toast.success(
          `Assessment (${response.name}) Was created successfully.`
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectCourse = (courseid: SelectedCorses) => {
    const check = selectedCourses.some((val) => val.id === courseid.id);
    if (check) {
      setCourses((prev) => prev.filter((course) => course.id !== courseid.id));
    } else {
      setCourses((prev) => [...prev, courseid]);
    }
  };


  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3 flex-wrap w-full justify-between">
          {courses.map((item) => {
            return (
              <FormField
                key={item.id}
                name={item.id}
                render={({ field }) => (
                  <FormItem className="flex flex-row flex-grow items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <Checkbox
                      checked={selectedCourses.some(
                        (val) => val.id === item.id
                      )}
                      onCheckedChange={() =>
                        handleSelectCourse({ id: item.id })
                      }
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor={item.id}>{item.name}</FormLabel>
                      <FormDescription>
                        Add {item.name} to this Assessment
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        <div className="flex w-full items-center gap-3 justify-between">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 " align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Create Assessment"}
        </Button>
      </form>
    </Form>
  );
};
