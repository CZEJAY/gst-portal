"use client";

import { FC } from "react";
import { StudentColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/dataTable";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface StudentClientProps {
  data: StudentColumn[];
}

export const StudentClient: FC<StudentClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Separator />
      <DataTable searchKey="matricNumber" columns={columns} data={data} />
    </>
  );
};
