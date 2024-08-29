import Quiz from "@/components/shared/Quiz";
import React from "react";
import TestPageLayout from "../_components/TestPageLayout";

const CoursePage = ({ params }: { params: {
  courseId: string
} }) => {
  return (
    <TestPageLayout>
      <Quiz courseId={params.courseId} />
    </TestPageLayout>
  );
};

export default CoursePage;
