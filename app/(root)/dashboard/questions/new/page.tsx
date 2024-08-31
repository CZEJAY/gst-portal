import { GET_ALL_COURSE } from "@/actions";
import QuestionCreationForm from "@/components/shared/QuestionCreationForm";
import React from "react";

const page = async () => {
  const selectedCourse = await GET_ALL_COURSE();
  const formattedCourses: {
    id: string;
    name: string;
  }[] =
    selectedCourse &&
    selectedCourse.map((val: any) => ({
      id: val.id,
      name: val.name,
    }));
  return (
    <div className="container">
        <QuestionCreationForm selectedCourse={formattedCourses} />
    </div>
  );

};

export default page;
