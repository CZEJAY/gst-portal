import { GET_ALL_COURSE } from "@/actions";
import Error from "@/components/shared/Error";
import React from "react";
import CourseCard from "./_components/CourseCard";

const page = async () => {
  try {
    const courses = await GET_ALL_COURSE();
    return (
      <div className="grid gap-4 grid-cols-3 mt-4">
        {courses.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    );
  } catch (error: any) {
    console.log("Error: ", error);

    return <Error />;
  }
};

export default page;
