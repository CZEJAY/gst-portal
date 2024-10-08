"use client";
import React, { useEffect, useState } from "react";
import QuizHeader from "./QuizHeader";
import QuizCard from "./QuizCard";
import { useCandidateAuth } from "@/context/CandidateAuthContext";
import { CHECK_FOR_ASSESSMENT, GETQUESTBYID, SUBMITTEST } from "@/actions";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

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
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [scoreSummary, setScoreSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [timer, setTimer] = useState(900);
  const [timerClock, setTimerClock] = useState("");
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [status, setStatus] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id, image, logout, candidateName } = useCandidateAuth();
  const router = useRouter()

  useEffect(() => {
    const getServerQuestion = async () => {
      try {
        setLoadingPage(true);
        if(id){
          const data = await GETQUESTBYID(courseId, id);
          const checkAssess = await CHECK_FOR_ASSESSMENT(id,  courseId);
          if(!checkAssess){
            router.push("/test")
          }
        if (data.Questions && data?.Questions?.length > 0) {
          // @ts-ignore
          setQuestions(data.Questions);
          const stripTime = data.examTime!.split(" ")[0];
          console.log("Exam Time", data.examTime);

          if (data.examTime) {
            setTimerClock(data.examTime);
            setTimer(+stripTime)
          }
          setGenera(data);
        }
        }
      } catch (error: any) {
        console.error("Error fetching quiz data:", error.message);
        toast.error("Something went wrong");
      } finally {
        setLoadingPage(false);
      }
    };
    getServerQuestion();
  }, []);

  useEffect(() => {
    // Timer logic
    const startTimer = () => {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(intervalId);
            handleSubmit(); // Auto-submit when the timer ends
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setTimerIntervalId(intervalId);
    };

    startTimer();

    return () => {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    };
  }, []);

  

  const handleAnswerSelect = (questionId: number, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const scores = calculateScore(answers);

      // Calculate percentage
      const percentage = ((scores / questions.length) * 100).toFixed(2);

      // Set score summary
      const summary = `${scores} out of ${questions.length} (${percentage}%)`;
      toast.success("Answers submitted successfully! Logging Out...");

      // const res = await SUBMITTEST(summary, General.name, id, +scores);

      // if (res.id) {
      //   toast.success("Answers submitted successfully! Logging Out...");
      //   setTimeout(() => {
      //     logout();
      //   }, 3000);
      // }
    } catch (error: any) {
      console.error("Error submitting quiz:", error.message);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = (userAnswers: Answers): number => {
    console.log(userAnswers);
    return questions.reduce(
      (score, question, index) =>
        userAnswers[question.id] === question.answer ? score + 1 : score,
      0
    );
  };

  const restartQuiz = () => {
    setAnswers({});
    setCorrectAnswersCount(0);
    setCurrentIndex(0);
    setShowResult(false);
    setLoading(false);
    setTimer(60);
    setScoreSummary("");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="">
      {loadingPage ? (
        <Loading />
      ) : (
        <section>
          {General && (
            <QuizHeader
              course={(General && General.name) || ""}
              quizLength={questions?.length || 0}
              timer={timerClock}
            />
          )}

          <div className="md:w-9/12 w-[100%] flex items-center md:flex-row flex-col mx-auto">
            {/* Question section */}
            <div className="md:w-[70%] w-full">
              <div>
                {questions && questions.length > 0 && !showResult && (
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
                  {currentIndex > 0 && !showResult && (
                    <button
                      onClick={handlePrev}
                      className="text-blue-300 px-2 py-2 border rounded"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={
                      currentIndex >= questions.length - 1 && !showResult
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

            {/* Candidate Info Section */}
            <div className="ml-10 mb-[4.5rem]">
              <div className="h-[220px] w-[220px]  mt-8 flex flex-col justify-center items-center border-2 rounded-md">
                <img alt="img" src={image} className="rounded-md h-32 " />
                <h1 className="text-sm font-bold my-2">{candidateName}</h1>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quiz;
