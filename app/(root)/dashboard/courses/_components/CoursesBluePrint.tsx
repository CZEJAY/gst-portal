"use client";
import Link from "next/link";
import { ActivitySquare, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import TreeMenu from "@/components/TreeMenu";
import { tree } from "@/constants";
import { useAssessmentModal } from "@/hooks/useMatricModal";
import AssessmentModal from "@/components/shared/AssessmentModal";
import { Assessments } from "@prisma/client";
import CourseTreeMenu from "./TreeMenu";

export function CourseBluePrint({
  children,
  assess,
}: {
  children: React.ReactNode;
  assess?: Assessments;
}) {
  const { isOpen, onClose, onOpen } = useAssessmentModal();
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <div className="absolute">
        <AssessmentModal isOpen={isOpen} onChange={onClose} />
      </div>
      <header className="sticky top-0 flex h-16 items-center gap-4  bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <ActivitySquare className="h-6 w-6 animate-pulse" />
            <span className="sr-only">Courses</span>
          </Link>
        </nav>
        <div className="ml-auto gap-5 flex">
          
          <Button className="" asChild>
            <Link href={"/dashboard/questions/new"} className="gap-2">
              <PlusCircle /> Add Courses
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-zinc-100 border rounded-md p-4 md:gap-8 md:p-10">
        <Link href="/dashboard/courses" className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Courses</h1>
        </Link>
        <div className="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] ">
          <nav
            className="grid gap-4 text-md  text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <CourseTreeMenu link="/dashboard/courses" data={assess} />
          </nav>
          <div className="grid gap-6 rounded bg-white p-5">{children}</div>
        </div>
      </main>
    </div>
  );
}
