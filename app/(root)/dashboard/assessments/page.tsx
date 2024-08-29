import { AssessmentComponent } from "@/components/dashboard/AssessmentComponent";
import React from "react";

const Assessments = () => {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="p-9 border rounded-md">
        <h1 className="font-bold text-xl text-blue-500 tracking-wide">
          Manage Assessments and More.
        </h1>
        <p className="text-sm font-medium">
          To begin, please select an assessment from the tree menu, if non
          exist, click on the "Add Assessment" button top right to create a new
          one.
        </p>
      </div>
    </div>
  );
};

export default Assessments;
