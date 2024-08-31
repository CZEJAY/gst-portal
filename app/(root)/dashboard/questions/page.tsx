import { GET_ALL_QESTIONS } from "@/actions";
import React from "react";
import QuestionsCard from "./_component/QuestionsCard";

const Questions = async () => {
  try {
    const questions = await GET_ALL_QESTIONS();
    const courses = questions.map(val => val.course)
    return (
      <div className="">
        <div className="">
        <p className="text-sm text-gray-800">Total ({questions.length})</p>
        
        </div>
        <div className="grid gap-4 grid-cols-3 mt-4">
          {questions.map((question, index) => (
            // @ts-ignore
            <QuestionsCard key={index} data={question} />
          ))}
        </div>
      </div>
    );
  } catch (error: any) {
    console.log("Error loading questions", error);

    return (
      <div className="bg-red-500 p-3 rounded-md text-lg text-white font-bold">
        Error loading data
      </div>
    );
  }
};

export default Questions;
