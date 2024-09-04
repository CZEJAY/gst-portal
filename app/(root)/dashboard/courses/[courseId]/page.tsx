import Error from "@/components/shared/Error";
import prismadb from "@/lib/prisma";
import React from "react";
import CourseForm from "../_components/CourseForm";

const page = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  try {
    const course = await prismadb.assessmentCourses.findUnique({
      where: {
        id: params.courseId,
      }
    })
    if(!course){
      return (
        <Error statusCode={404} title="Course not found"/>
      )
    }
    return <div>
      ID: {params.courseId}
      <CourseForm id={params.courseId} course={course} />
    </div>;
  } catch (error: any) {
    console.log("Error", error);

    return <Error />;
  }
};

export default page;
