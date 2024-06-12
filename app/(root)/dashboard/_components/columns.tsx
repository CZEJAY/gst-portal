"use client"

import { ColumnDef } from "@tanstack/react-table";

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
        header: "First Name"
    },
    {
        accessorKey: "otherName",
        header: "Other Name"
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
        header: "Matric Number"
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
    }
]