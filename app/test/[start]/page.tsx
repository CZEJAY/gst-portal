import Quiz from "@/components/shared/Quiz";
import React from "react";
import TestPageLayout from "../_components/TestPageLayout";

const page = ({start}:{
  start:string
} ) => {
  return (
    <TestPageLayout>
      <Quiz courseId={start}  />
    </TestPageLayout>
  );
};

export default page;
