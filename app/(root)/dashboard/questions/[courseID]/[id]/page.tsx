import { GET_ALL_COURSE } from "@/actions";
import Error from "@/components/shared/Error";
import QuestionCreationForm, {
  QuestionFormState,
} from "@/components/shared/QuestionCreationForm";
import prismadb from "@/lib/prisma";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    courseID: string;
    id: string;
  };
}) => {
  try {
    const question = await prismadb.question.findUnique({
      where: {
        id: params.id,
      },
    });
    const initalCourse = await prismadb.assessmentCourses.findUnique({
      where: {
        id: params.courseID,
      },
      select: {
        name: true,
        id: true,
      },
    });
    const selectedCourse = await GET_ALL_COURSE();
    if (question) {
      const formatted: QuestionFormState = {
        question: question.question,
        answer: question.answer,
        options: question.options,
      };
      const formattedCourses: {
        id: string;
        name: string;
      }[] =
        selectedCourse &&
        selectedCourse.map((val: any) => ({
          id: val.id,
          name: val.name,
        }));
      return (
        <QuestionCreationForm
          initialCourse={initalCourse ? initalCourse : null}
          selectedCourse={selectedCourse}
          initialState={formatted}
          isEditing
          questionId={params.id}
        />
      );
    }
  } catch (error: any) {
    <Error />;
  }
};

export default page;
