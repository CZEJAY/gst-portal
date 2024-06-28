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
import Link from "next/link";

export default function SideComponent() {
  const selectedStudent = useStudentStore((state) => state.selectedStudent);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      /> */}

      <Card className="overflow-hidden max-h-[890px] mr-5 mt-28 min-w-[500px]">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedStudent
                ? `${selectedStudent?.student?.surName.toUpperCase()}'s Detail`
                : "Student Details"}
            </CardTitle>
            <CardDescription>
              {selectedStudent
                ? `Date: ${format(
                    String(selectedStudent?.student?.createdAt),
                    "MMMM do, yyyy"
                  )}`
                : "Select a student."}
            </CardDescription>
          </div>
          {selectedStudent ? (
            <Link
              className="bg-orange-900 text-white ml-auto p-2 px-3 rounded-md"
              href={`/print/${selectedStudent?.student?.id}`}
            >
              Print
            </Link>
          ) : null}
        </CardHeader>
        {selectedStudent ? (
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <ul className="grid gap-3">
              <div className="relative w-[200px] h-[200px] mx-auto overflow-hidden rounded-full">
            <Image
              src={selectedStudent?.student?.image as string}
              width={200}
              height={200}
              loading="eager"
              alt="user"
              className="object-cover w-full h-full transform scale-105 "
            />
          </div>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Matric Number</span>
                  <span>{selectedStudent?.student?.matricNumber}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Personal Information</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Surname</span>
                  <span>{selectedStudent?.student?.surName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Firstname</span>
                  <span>{selectedStudent?.student?.firstName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Othername</span>
                  <span>{selectedStudent?.student?.otherName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{selectedStudent?.student?.gender}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone Number</span>
                  <span>{selectedStudent?.student?.phone}</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">School Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Faculty</dt>
                  <dd>{selectedStudent?.student?.faculty}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Department</dt>
                  <dd>{selectedStudent?.student?.department}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Level</dt>
                  <dd>{selectedStudent?.student?.level}</dd>
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
        <div className="text-xs text-muted-foreground">
          {selectedStudent
            ? `Updated: ${format(
                String(selectedStudent?.student?.updatedAt),
                "MMMM do yyy"
              )}`
            : "Please select a student."}
        </div>
        <CardFooter className="flex flex-col items-start border-t bg-muted/50 px-6 py-3">
          {selectedStudent?.student?.registrarRel && (
            <div className="grid gap-3">
              <div className="font-semibold">Registrar Details</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd>{selectedStudent?.student?.registrarRel?.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Total</dt>
                  <dd>{selectedStudent.studentsCount}</dd>
                </div>
              </dl>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
