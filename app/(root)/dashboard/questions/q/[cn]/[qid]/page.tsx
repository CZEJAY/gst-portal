import Error from "@/components/shared/Error";
import prismadb from "@/lib/prisma";
import React from "react";
import QuestionsCard from "../../../_component/QuestionsCard";
import PopulateBtn from "../../../_component/PopulateBtn";

type Props = {
  params: {
    cn: string;
    qid: string;
  };
};

const page = async (props: Props) => {
  try {
    const { cn, qid } = props.params;
    const courseQuestions = await prismadb.question.findMany({
      where: {
        course: {
          id: qid,
        },
      },
      orderBy: {
        updatedAt: "desc"
      },
      include: {
        course: true,
      },
    });
    return (
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">
            {cn.replaceAll("-", " ").toUpperCase()} Questions
          </h1>{" "}
          |
          <p className="text-sm text-gray-900">
            Total ({courseQuestions.length})
          </p>
          <div className="ml-auto">
            <PopulateBtn />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-3 mt-4">
          {courseQuestions.map((question, index) => (
            // @ts-ignore
            <QuestionsCard key={index} data={question} />
          ))}
        </div>
      </div>
    );
  } catch (error: any) {
    console.log("Error geting  questions", error);

    return <Error />;
  }
};

export default page;
