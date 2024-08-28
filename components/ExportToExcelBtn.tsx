"use client"
import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';

const ExportToExcel = ({ data }: { data: any[] }) => {
  const handleExport = () => {
    // Create a new workbook and add a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StudentsData');

    // Create a binary Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the binary buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a link and trigger a download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url); // Clean up the URL object
  };

  return <Button onClick={handleExport}>Export to Excel</Button>;
};

export default ExportToExcel;