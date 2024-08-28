"use client"

import { ConvertToCvs } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";

const ExportBtn = ({ data }: { data: any[] }) => {
  const handleExport = () => {
    const cvsData = ConvertToCvs(data);
    // console.log(data[5])
    const blob = new Blob([cvsData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_data.csv";
    a.click();
  };
  return <Button onClick={handleExport}>Export to CSV</Button>;
};

export default ExportBtn;
