"use client";

import { ADDQUESTIONTOCOURSE } from "@/actions";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface QuestionFormState {
  question: string;
  options: string[];
  answer: string;
}

const QuestionCreationForm = () => {
  const [formState, setFormState] = useState<QuestionFormState>({
    question: "",
    options: ["", ""], // Initialize with 2 empty options
    answer: "",
  });

  const [courseID, setCourseID] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (typeof index === "number") {
      const updatedOptions = formState.options.map((option, i) =>
        i === index ? value : option
      );
      setFormState({
        ...formState,
        options: updatedOptions,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleAddOption = () => {
    setFormState((prevState) => ({
      ...prevState,
      options: [...prevState.options, ""],
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (formState.answer === "") {
        toast.warning("Please select the correct answer.");
        return;
      }

      const res = await ADDQUESTIONTOCOURSE(formState, courseID);

      if (res.id) {
        toast.success("Question added successfully");
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);

      setFormState({
        question: "",
        options: ["", ""], // Reset to 2 empty options
        answer: "",
      });
    }
  };

  const courses = [
    { id: "66cf8a72ace84cb73667f401", name: "CHM 121" },
    { id: "66cf8c8eace84cb73667f403", name: "CHM 128" },
  ];

  return (
    <form onSubmit={handleFormSubmit} className="max-w-4xl space-y-4">
      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Question:
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={formState.question}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-14"
          required
        />
      </div>

      <div className="space-y-2">
        {formState.options.map((option, index) => (
          <div key={index}>
            <label
              htmlFor={`option-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Option {index + 1}:
            </label>
            <input
              type="text"
              id={`option-${index}`}
              value={option}
              onChange={(e) => handleInputChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
              required
            />
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Option
        </button>
      </div>

      <div className="flex w-full gap-3 items-center">
        <div>
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-gray-700"
          >
            Correct Answer:
          </label>
          <select
            id="answer"
            name="answer"
            value={formState.answer}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
            required
          >
            <option value="" disabled>
              Select the correct answer
            </option>
            {formState.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="cid"
            className="block text-sm font-medium text-gray-700"
          >
            Course to add to:
          </label>
          <select
            id="cid"
            name="cid"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
            required
          >
            <option value="" disabled>
              Select the Course
            </option>
            {courses.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {
            loading ? <Loader2 className="animate-spin" /> : "Submit Question"
          }
        </button>
      </div>
    </form>
  );
};

export default QuestionCreationForm;
