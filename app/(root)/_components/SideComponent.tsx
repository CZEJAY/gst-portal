"use client";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  TrafficCone,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { students } from "@prisma/client";
import { useStudentStore } from "@/context/zustand";
import { format } from "date-fns";
import Image from "next/image";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";

export default function SideComponent() {
  const selectedStudent = useStudentStore((state) => state.selectedStudent);
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      /> */}

      <Card className="overflow-hidden max-h-[750px] mr-5 mt-28 min-w-[500px]">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedStudent
                ? `${selectedStudent.surName.toUpperCase()}'s Detail`
                : "Student Details"}
            </CardTitle>
            <CardDescription>
              {selectedStudent
                ? `Date: ${format(selectedStudent.createdAt, "MMMM do, yyyy")}`
                : "Select a student."}
            </CardDescription>
          </div>
        </CardHeader>
        {selectedStudent ? (
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <ul className="grid gap-3">
                <div className="">
                  <Image
                    src={selectedStudent.image}
                    alt="student"
                    width={200}
                    height={200}
                  />
                </div>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Matric Number</span>
                  <span>{selectedStudent.matricNumber}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Personal Information</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Surname</span>
                  <span>{selectedStudent.surName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Firstname</span>
                  <span>{selectedStudent.firstName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Othername</span>
                  <span>{selectedStudent.otherName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{selectedStudent.gender}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span>{selectedStudent.phone}</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">School Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Faculty</dt>
                  <dd>{selectedStudent.faculty}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Department</dt>
                  <dd>{selectedStudent.department}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Level</dt>
                  <dd>{selectedStudent.level}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <TrafficCone />
            <p>Please select a student to view details</p>
          </CardContent>
        )}
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            {selectedStudent
              ? `Updated: ${format(selectedStudent.updatedAt, "MMMM do yyy")}`
              : "Please select a student."}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
