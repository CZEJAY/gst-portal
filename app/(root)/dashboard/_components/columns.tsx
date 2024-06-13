"use client"

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type StudentColumn = {
    surName: string;
    firstName: string;
    otherName: string;
    faculty: string;
    gender: string;
    department: string;
    matricNumber: string;
    level: string;
    phone?: string;
    createdAt: string;
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
        accessorKey: "level",
        header: "Level"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    {
        id: "action",
        cell: ({ row }) => <CellAction data={row.original}/>
      }
]