import { GETCOURSEANDPARTICIPANT } from "@/actions";
import React from "react";
import CourseComp from "../_components/CourseComp";
import { StudentColumn } from "../_components/columns";

const page = async ({
  params,
}: {
  params: {
    courseID: string;
  };
}) => {
    const data = await GETCOURSEANDPARTICIPANT(params.courseID)
    // @ts-ignore
    const formattedData: StudentColumn[] = data?.participants.map((item) => {
        const formattedCourse = item.courses.map((value) => value).join(" ");
        return {
          surName: item.surName,
          firstName: item.firstName,
          otherName: item.otherName as string,
          // courses: item.courses,
          courses: formattedCourse,
          faculty: item.faculty,
          // email: item.email?.toLocaleLowerCase(),
          department: item.department,
          // level: item.level,
          matricNumber: item.matricNumber,
          phone: item.phone as string,
          // createdAt: format(item.createdAt, "MMMM do, yyyy"),
        };
      });
  return <CourseComp formattedData={formattedData} data={data}/>

};

export default page;
