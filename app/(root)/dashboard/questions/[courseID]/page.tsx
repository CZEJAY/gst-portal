import QuestionCreationForm from "@/components/shared/QuestionCreationForm";
import React from "react";

const page = ({
  params,
}: {
  params: {
    courseID: string;
  };
}) => {
  return <QuestionCreationForm  />;

};

export default page;
