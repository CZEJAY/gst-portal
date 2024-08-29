import Quiz from "@/components/shared/Quiz";
import React from "react";
import TestPageLayout from "../_components/TestPageLayout";

const page = ({ courseId }: { courseId: string }) => {
  return (
    <TestPageLayout>
      <Quiz courseId={courseId} />
    </TestPageLayout>
  );
};

export default page;
