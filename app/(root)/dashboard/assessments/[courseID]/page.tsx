import { GETCOURSEANDPARTICIPANT } from "@/actions";
import React from "react";
import CourseComp from "../_components/CourseComp";
import { StudentColumn } from "../_components/columns";
import Error from "@/components/shared/Error";

const page = async ({
  params,
}: {
  params: {
    courseID: string;
  };
}) => {
  try {
    const data = await GETCOURSEANDPARTICIPANT(params.courseID);
    // console.log("Server DTO ==", data);

    // Format the data for the page
    if(data){
      const formattedData: StudentColumn[] = data?.participants.map((item) => {
        const f_d = {
          surName: item.surName,
          firstName: item.firstName,
          otherName: item.otherName as string,
          courses: item.courses.map((item) => item).join(" "),
          faculty: item.faculty,
          department: item.department,
          matricNumber: item.matricNumber,
          phone: item.phone,
          assessmentId: data.id
        };
        return f_d;
      });
      return <CourseComp formattedData={formattedData} data={data} />;
    }
  } catch (error) {
    console.error("Error fetching course and participant data:", error);
    // You might want to render an error component or return null
    return (
      <Error />
    );
  }
};

export default page;
