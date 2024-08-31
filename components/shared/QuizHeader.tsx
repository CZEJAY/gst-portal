/* eslint-disable react/prop-types */

import React from "react";
import Timer from "./Timer";

interface QuizHeaderProps {
  timer: string;
  quizLength: number;
  course: string;
}


const QuizHeader: React.FC<QuizHeaderProps> = ({
  timer,
  course,
  quizLength,
}) => {
  return (
    <section
      className="shadow-sm my-5 py-2 sticky top-0 bg-white z-10"
      id="alertContainer"
    >
      <div className="container mx-auto text-center font-bold ">
        <h1>{course} CBT</h1>
      </div>
      <div className="w-9/12 mx-auto flex md:flex-row flex-col justify-between items-center">
        <div className="font-normal">
          <span className="text-red-700">Attention!</span> You have {timer} to
          answer ({quizLength}) questions.
          <br />
          Please keep an eye on the timer and make sure to answer all questions
          before time runs out.
        </div>
        <div className="flex items-center">
          <p className="mr-2 text-xl text-gray-700">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </p>
          <div className="text-left">
            <Timer initialTime={timer} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizHeader;
