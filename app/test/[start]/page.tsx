import Quiz from "@/components/shared/Quiz";
import React from "react";
import TestPageLayout from "../_components/TestPageLayout";

const page = ({id}:{
  id:string
} ) => {
  return (
    <TestPageLayout>
      <Quiz courseId={id}  />
    </TestPageLayout>
  );
};

export default page;
