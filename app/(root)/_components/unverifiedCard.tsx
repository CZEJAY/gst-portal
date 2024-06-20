"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { UserX2 } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/ui/dataTable";
import { StudentColumn, columns } from "../dashboard/_components/columns";

const UnverifiedCard = ({ unverified, data }: { unverified: number, data: StudentColumn[] }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card
          className="sm:col-span-2 hover:scale-105 cursor-pointer duration-200 transition-all"
          x-chunk="dashboard-05-chunk-0"
        >
          <CardHeader className="pb-3">
            <CardTitle className="w-full flex items-center justify-between">
              Unverified Enrollments
              <UserX2 />
            </CardTitle>
            <CardDescription className="max-w-lg text-balance text-sm leading-relaxed">
              Students pending fingerprint enrollment and verification.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p className="text-4xl text-orange-900">{unverified}</p>
          </CardFooter>
        </Card>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-light-2 min-w-[950px]">
      <DataTable searchKey="matricNumber" columns={columns} data={data} />
      <AlertDialogFooter>
          <AlertDialogCancel className="bg-orange-900 border-none text-white">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnverifiedCard;
