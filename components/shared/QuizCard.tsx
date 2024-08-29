import React from 'react';

interface QuizCardProps {
  item: {
    id: number;
    question: string;
    options: string[];
  };
  index: number;
  answers: { [key: number]: string };
  handleAnswerSelect: (selection: { id: number; option: string }) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ item, index, answers, handleAnswerSelect }) => {
  return (
    <div className="m-3 py-3 px-4 shadow-sm border border-gray-200 rounded">
      <div className="flex items-center rounded text-xs p-2 cursor-pointer">
        <span className="h-8 w-8 bg-blue-600 rounded-full flex justify-center items-center text-green-800 mr-3">
          {index + 1}
        </span>
        <p>{item.question || ""}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        {item.options.map((option, idx) => (
          <div
            className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${answers[item.id] === option ? "bg-gray-300" : ""
              }`}
            key={option}
            onClick={() => handleAnswerSelect({ id: item.id, option })}
          >
            <p className="text-[10px] mb-1">Option {idx + 1}</p>
            <p>{option || ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
