"use client";

import { GETSERVERQS, GETSTUDENTBYID } from "@/actions";
import { Button } from "@/components/ui/button";
import { useCandidateAuth } from "@/context/CandidateAuthContext";
import { students } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Mainmenu = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { id, image, candidateName } = useCandidateAuth();
  const [student, setStudent] = useState<students>();

  useEffect(() => {
    const getServerQuestion = async () => {
      try {
        if (id) {
          const candidateData = localStorage.getItem("candidateAuth");
          // @ts-
          setTimeout(async () => {
            const { error, questions } = await GETSERVERQS(id);
            const ser1 = await GETSTUDENTBYID(id);
            setStudent(ser1.data);
            if (questions) {
              // @ts-ignore
              setData(questions);
            }
            if (error) {
              toast.error(error);
            }
          }, 1000);
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

  return (
    <div className="ml-5 ">
      <div className="grid grid-cols-3 gap-6">
        {data &&
          data.map((item: any, index: number) => {
            const is121Disabled =
              student?.isCHM121Done && item.name === "CHM121";
            const is128Disabled =
              student?.isCHM128Done && item.name === "CHM128";
            const instructions = item.instructions?.replace(/\d+\.\s*/g, "");
            const instructionsArray = instructions?.split(". ");
            return (
              <div
                key={index}
                className="p-5 col-span-1 relative flex-col py-9 border w-[400px] rounded-md flex shadow-xl bg-transparent backdrop-blur-md"
              >
                {is121Disabled && (
                  <div className="absolute inset-3 flex-col bg-emerald-500 flex items-center justify-center p-2 rounded">
                    <h2 className="text-white">{item.name} CBT</h2>
                    <p className="text-white text-center text-sm">Done</p>
                  </div>
                )}
                {is128Disabled && (
                  <div className="absolute inset-3 flex-col bg-emerald-500 flex items-center justify-center p-2 rounded">
                    <h2 className="text-white">{item.name} CBT</h2>
                    <p className="text-white text-center text-sm">Done</p>
                  </div>
                )}
                <h2 className="font-bold text-lg">{item.name} CBT</h2>
                <div className="mt-3">
                  <p className="text-sm text-gray-800">
                    Duration : {item.examTime}
                  </p>

                  <div className="mt-3">
                    <p className="text-sm text-gray-800">Instructions</p>
                    <div className="flex flex-col items-center gap-3">
                      {instructionsArray &&
                        instructionsArray.length > 0 &&
                        instructionsArray.map(
                          (instruction: any, index: number) => {
                            return (
                              <span
                                key={index}
                                className="text-sm text-gray-800"
                              >
                                {instruction}
                              </span>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
                <div className="mt-8 ml-auto">
                  <Button className="" asChild>
                    <Link href={`/test/${item.id}`}>Take Test</Link>
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Mainmenu;
