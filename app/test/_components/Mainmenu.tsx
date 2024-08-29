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
            const data = await GETSERVERQS(id);
            const ser1 = await GETSTUDENTBYID(id);
            setStudent(ser1.data);
            if (data && data?.length > 0) {
              // @ts-ignore
              setData(data);
              console.log(data);
            }
          }, 5000);
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
      <div className="flex gap-3  w-full">
        {data &&
          data.map((item: any, index: number) => {
            const is121Disabled =
              student?.isCHM121Done && item.name === "CHM121";
            const is128Disabled =
              student?.isCHM128Done && item.name === "CHM128";

            return (
              <div className="p-5 relative py-9 border w-[400px] rounded-md flex shadow-xl bg-transparent backdrop-blur-md">
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
                <h2>{item.name} CBT</h2>
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
