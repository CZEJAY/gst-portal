"use client"

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type StudentColumn = {
    surName: string;
    firstName: string;
    otherName: string;
    faculty: string;
    department: string;
    matricNumber: string;
    phone?: string;
    assessmentId?: string;
    courses: string;
    // createdAt: string;
}

export const columns: ColumnDef<StudentColumn>[] = [
    {
        accessorKey: "surName",
        header: "Surname"
    },
    {
        accessorKey: "firstName",
        header: "Firstname"
    },
    {
        accessorKey: "otherName",
        header: "Othername"
    },
    {
        accessorKey: "faculty",
        header: "Faculty"
    },
    {
        accessorKey: "department",
        header: "Department"
    },
    {
        accessorKey: "matricNumber",
        header: "Matric"
    },
    {
        accessorKey: "courses",
        header: "Courses"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    // {
    //     accessorKey: "createdAt",
    //     header: "Date"
    // },
    {
        id: "action",
        header: () => <span>Actions</span>,
        cell: ({ row }) => <CellAction data={row.original}/>
      }
]