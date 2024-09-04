"use client";
import { ADDQUESTIONTOCOURSE, UPDATE_QUESTION } from "@/actions";
import { Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import ProgressModal from "./QuestionUploadProgress";

export interface QuestionFormState {
  question: string;
  options: string[];
  answer: string;
}

const QuestionCreationForm = ({
  initialState,
  isEditing,
  selectedCourse,
  initialCourse,
  questionId,
}: {
  initialState?: QuestionFormState;
  initialCourse?: { id: string; name: string } | null;

  isEditing?: boolean;
  questionId?: string;
  selectedCourse?: {
    id: string;
    name: string;
  }[];
}) => {
  const [questions, setQuestions] = useState<QuestionFormState[]>(
    initialState
      ? [{ ...initialState }]
      : [
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
        ]
  );

  const [courseID, setCourseID] = useState("");
  const [courses, setCourses] = useState(selectedCourse);
  const [loading, setLoading] = useState(false);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetData, setSheetData] = useState<Uint8Array>();
  const [progress, setProgress] = useState(0); // New state for progress
  const [modalOpen, setModalOpen] = useState(false); // New state to control the modal

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    optionIndex?: number
  ) => {
    const { name, value } = e.target;

    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              ...(typeof optionIndex === "number"
                ? {
                    options: q.options.map((opt, j) =>
                      j === optionIndex ? value : opt
                    ),
                  }
                : { [name]: value }),
            }
          : q
      )
    );
  };

  const handleAddOption = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              options: [...q.options, ""],
            }
          : q
      )
    );
  };

  const handleDeleteOption = (qIndex: number, optionIndex: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.filter((_, j) => j !== optionIndex),
            }
          : q
      )
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setModalOpen(true); // Open the modal when submitting starts
      let progressIncrement = 100 / questions.length;

      for (const formState of questions) {
        if (formState.answer === "") {
          toast.warning("Please select the correct answer.");
          return;
        }
        if (isEditing) {
          const update = await UPDATE_QUESTION(formState, questionId as string);
          if (update.id) {
            toast.success("Question updated successfully");
            router.push("/dashboard/questions");
          }
        } else {
          const res = await ADDQUESTIONTOCOURSE(formState, courseID);
        }

        setProgress((prev) => prev + progressIncrement); // Update progress
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setModalOpen(false); // Close the modal after submission
      setProgress(0); // Reset progress
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      setSheetData(data);
      // Store sheet names in state
      setSheetNames(workbook.SheetNames);
      setSelectedSheet(null); // Reset selected sheet
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSheetSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sheetName = e.target.value;
    setSelectedSheet(sheetName);

    if (sheetName) {
      const workbook = XLSX.read(sheetData, { type: "array" });
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Process the Excel data
      const parsedQuestions = json.slice(1).map((row: any) => ({
        question: row[0] as string,
        options: [
          row[1].toString(),
          row[2].toString(),
          row[3].toString(),
          row[4].toString(),
        ].filter(Boolean),
        answer: row[1].toString() as string,
      }));

      // Set all questions into state
      setQuestions(parsedQuestions);
    }
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-2 gap-6 w-full space-y-4 relative"
      >
        <div className="absolute -right-14 -top-2 py-2 px-2 text-center rounded-full bg-primary text-white">
          Total: {questions.length}
        </div>
        <div>
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Questions (Excel):
          </label>
          <input
            type="file"
            id="file-upload"
            name="file-upload"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="mt-1 block w-full rounded-md border border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
          />
        </div>
        {sheetNames.length > 0 && (
          <div>
            <label
              htmlFor="sheet-select"
              className="block text-sm font-medium text-gray-700"
            >
              Select Sheet:
            </label>
            <select
              id="sheet-select"
              name="sheet-select"
              value={selectedSheet || ""}
              onChange={handleSheetSelection}
              className="mt-1 block w-full rounded-md border border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
            >
              <option value="" disabled>
                Select a sheet
              </option>
              {sheetNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        {questions.map((formState, qIndex) => (
          <div key={qIndex} className="space-y-6">
            <div>
              <label
                htmlFor={`question-${qIndex}`}
                className="block text-sm font-medium text-gray-700"
              >
                Question {qIndex + 1}:
              </label>
              <input
                type="text"
                id={`question-${qIndex}`}
                name="question"
                value={formState.question}
                onChange={(e) => handleInputChange(e, qIndex)}
                className="mt-1 block w-full rounded-md border-2 border-solid border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-14"
                required
              />
            </div>

            <div className="space-y-2">
              {formState.options.map((option, optionIndex: number) => (
                <div
                  className="flex items-center w-full gap-2"
                  key={optionIndex}
                >
                  <div className="w-full">
                    <label
                      htmlFor={`option-${qIndex}-${optionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Option {optionIndex + 1}:
                    </label>
                    <input
                      type="text"
                      id={`option-${qIndex}-${optionIndex}`}
                      value={option}
                      onChange={(e) =>
                        handleInputChange(e, qIndex, optionIndex)
                      }
                      className="mt-1 block w-full rounded-md border border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => handleDeleteOption(qIndex, optionIndex)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleAddOption(qIndex)}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Option
              </button>
            </div>

            <div>
              <label
                htmlFor={`answer-${qIndex}`}
                className="block text-sm font-medium text-gray-700"
              >
                Correct Answer:
              </label>
              <select
                id={`answer-${qIndex}`}
                name="answer"
                value={formState.answer}
                onChange={(e) => handleInputChange(e, qIndex)}
                className="mt-1 block w-full rounded-md border border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9"
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

            <hr className="my-4 border-gray-300" />
          </div>
        ))}

        <div>
          <label
            htmlFor="cid"
            className="block text-sm font-medium text-gray-700"
          >
            {isEditing
              ? "Question was added to " + initialCourse?.name
              : "Course to add to:"}
          </label>
          <select
            id="cid"
            name="cid"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
            className="mt-1 block w-full rounded-md border-2 border-black pl-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-9 disabled:opacity-40 disabled:cursor-not-allowed"
            required
            disabled={isEditing}
          >
            <option value="" disabled>
              {isEditing ? initialCourse?.name : "Select the Course"}
            </option>
            {courses &&
              courses.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isEditing ? "bg-yellow-400" : "bg-blue-600"
            }  ${
              isEditing ? "hover:bg-yellow-700" : "hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 `}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isEditing ? (
              "Save Question"
            ) : (
              "Submit Questions"
            )}
          </button>
        </div>
      </form>
      <ProgressModal isOpen={modalOpen} progress={progress} />
    </>
  );
};

export default QuestionCreationForm;
