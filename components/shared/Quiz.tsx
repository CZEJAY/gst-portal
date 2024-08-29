"use client";
import React, { useEffect, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizCard from "./QuizCard";
import { useCandidateAuth } from "@/context/CandidateAuthContext";
import { GETQUESTBYID, GETSERVERQS, SUBMITTEST } from "@/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => (
  <div className="h-[220px] w-[220px] absolute inset-0 z-[999] top-1/2 mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

// Utility function to format time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Answers {
  [key: number]: string;
}

const Quiz = ({ courseId }: { courseId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [General, setGenera] = useState<any>();
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(900);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [status, setStatus] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id, image, logout, candidateName } = useCandidateAuth();
  useEffect(() => {
    // fetch("/quiz.json")
    //   .then((response) => response.json())
    //   .then((data) => setQuestions(data))
    //   .catch((error) => console.error("Error fetching quiz data:", error));

    const getServerQuestion = async () => {
      try {
        setLoading(true);
        const data = await GETQUESTBYID(courseId, id);

        if (data.Questions && data?.Questions?.length > 0) {
          // @ts-ignore
          setQuestions(data.Questions);
          setGenera(data);
        }
      } catch (error: any) {
        console.error("Error fetching quiz data:", error.message);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getServerQuestion();
  }, []);

  const handleAnswerSelect = (questionId: number, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(answers);
      setLoading(true);
      const scores = calculateScore(answers);
      const converted = String(scores);
      const res = await SUBMITTEST(converted, General.name, id);
      console.log(General.name);

      if (res.id) {
        toast.success("Answers submited successfully! Logging Out...");
        setTimeout(() => {
          logout();
        });
      }
    } catch (error: any) {
      console.error("Error submitting quiz:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = (userAnswers: Answers): number => {
    return questions.reduce(
      (score, question, index) =>
        userAnswers[index + 1] === question.answer ? score + 1 : score,
      0
    );
  };

  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section>
      <QuizHeader
        course={(General && General.name) || ""}
        quizLength={questions?.length || 0}
        timer={timer}
      />

      <div className="md:w-9/12 w-[90%] flex md:flex-row flex-col mx-auto">
        {/* Question section */}
        <div className="md:w-[70%] w-full">
          <div>
            {questions && questions.length > 0 && (
              <QuizCard
                item={questions[currentIndex]}
                index={currentIndex}
                answers={answers}
                handleAnswerSelect={({ id, option }) =>
                  handleAnswerSelect(id, option)
                }
              />
            )}
            <div className="flex w-full items-center justify-between">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="text-blue-300 px-2 py-2 border rounded"
                >
                  Previous
                </button>
              )}
              <button
                onClick={
                  currentIndex >= questions.length - 1
                    ? handleSubmit
                    : handleNext
                }
                className="bg-blue-700 ml-auto px-4 py-2 text-white rounded"
              >
                {loading && <Loader2 className="animate-spin" />}{" "}
                {currentIndex === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>

        {/* Result section */}
        {/* <div className="md:w-[30%] w-full p-4">
          {showResult && (
            
          )}

          </div> */}
        <div>
          <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
            <img alt="img" src={image} className="rounded-md h-32 " />
            <h1 className="text-sm font-bold my-2">{candidateName}</h1>
          </div>
        </div>
        {/* {loading && <Loading />} */}
      </div>
    </section>
  );
};

export default Quiz;
