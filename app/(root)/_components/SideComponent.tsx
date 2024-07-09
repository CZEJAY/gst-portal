"use client";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Copy,
  CreditCard,
  MoreVertical,
  RefreshCcwDotIcon,
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
import { useStudentStore } from "@/context/zustand";
import { format } from "date-fns";
import Image from "next/image";
import AlertModal from "@/components/modals/AlertModal";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { GETSTUDENT, UPDATESTUDENT } from "@/actions";
import { students } from "@prisma/client";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export type Student = {
  id: string;
  image: string;
  matricNumber: string;
  surName: string;
  firstName: string;
  otherName: string;
  gender: string;
  phone: string;
  email: string;
  faculty: string;
  department: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  registrarRel: {
    name: string;
  };
};

type SelectedStudent = {
  student: Student;
  studentsCount: number;
};

export default function SideComponent() {
  const selectedStudent = useStudentStore((state) => state.selectedStudent) as SelectedStudent;
  const {clearSelectedStudent, setSelectedStudent} = useStudentStore();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [updatedStudent, setUpdatedStudent] = useState<Partial<students>>({});
  const router = useRouter()
  const {data} = useSession()
  const isAdmin = data?.user?.name === "caleb"
  const handleEdit = (field: keyof Student) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof Student) => {
    setUpdatedStudent((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    // Here you can add the logic to save the updated student details
    // For example, you could call an API endpoint to update the student in the database
    console.log('Updated student details:', updatedStudent);
    try {
      if(!isAdmin){
        return toast.error('You are not authorized to edit student details')
      }
      const result = await UPDATESTUDENT({id: selectedStudent.student.id, updatedStudent})
      toast.success(`${result.firstName} updated!`)
      const updatedRes = await GETSTUDENT(result.matricNumber)
      clearSelectedStudent()
      setTimeout(() => {
        setSelectedStudent(updatedRes)
      }, 1000)
      router.refresh()
    } catch (error: any) {
      console.log("Error updating student", error)
      toast.error("Error updating student")
    }
    // Reset edit mode and updated student state
    setIsEditing({});
    setUpdatedStudent({});
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      /> */}

      <Card className="overflow-hidden max-h-[920px] mr-5 mt-28 min-w-[500px]">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {selectedStudent
                ? `${selectedStudent?.student?.surName?.toUpperCase()}'s Detail`
                : "Student Details"}
            </CardTitle>
            <CardDescription>
              {selectedStudent
                ? `Date: ${format(
                    new Date(selectedStudent?.student?.createdAt),
                    "MMMM do, yyyy, hh:mm:ss a"
                  )}`
                : null}
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
                    className="object-cover w-full h-full transform scale-105"
                  />
                </div>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Matric Number</span>
                  {isEditing.matricNumber ? (
                    <input
                      type="text"
                      value={updatedStudent.matricNumber || selectedStudent?.student?.matricNumber}
                      onChange={(e) => handleChange(e, 'matricNumber')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, matricNumber: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('matricNumber')}>
                      {selectedStudent?.student?.matricNumber}
                    </span>
                  )}
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Personal Information</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Surname</span>
                  {isEditing.surName ? (
                    <input
                      type="text"
                      value={updatedStudent.surName || selectedStudent?.student?.surName}
                      onChange={(e) => handleChange(e, 'surName')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, surName: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('surName')}>
                      {selectedStudent?.student?.surName}
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Firstname</span>
                  {isEditing.firstName ? (
                    <input
                      type="text"
                      value={updatedStudent.firstName || selectedStudent?.student?.firstName}
                      onChange={(e) => handleChange(e, 'firstName')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, firstName: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('firstName')}>
                      {selectedStudent?.student?.firstName}
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Othername</span>
                  {isEditing.otherName ? (
                    <input
                      type="text"
                      value={updatedStudent.otherName || selectedStudent?.student?.otherName}
                      onChange={(e) => handleChange(e, 'otherName')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, otherName: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('otherName')}>
                      {selectedStudent?.student?.otherName}
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  {isEditing.gender ? (
                    <input
                      type="text"
                      value={updatedStudent.gender || selectedStudent?.student?.gender}
                      onChange={(e) => handleChange(e, 'gender')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, gender: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('gender')}>
                      {selectedStudent?.student?.gender}
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone Number</span>
                  {isEditing.phone ? (
                    <input
                      type="text"
                      value={updatedStudent.phone || selectedStudent?.student?.phone}
                      onChange={(e) => handleChange(e, 'phone')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, phone: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('email')}>
                      {selectedStudent?.student?.phone}
                    </span>
                  )}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email Address</span>
                  {isEditing.email ? (
                    <input
                      type="text"
                      value={updatedStudent.email || selectedStudent?.student?.email}
                      onChange={(e) => handleChange(e, 'email')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, email: false }))}
                    />
                  ) : (
                    <span onClick={() => handleEdit('email')}>
                      {selectedStudent?.student?.email || "N/A"}
                    </span>
                  )}
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">School Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Faculty</dt>
                  {isEditing.faculty ? (
                    <input
                      type="text"
                      value={updatedStudent.faculty || selectedStudent?.student?.faculty}
                      onChange={(e) => handleChange(e, 'faculty')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, faculty: false }))}
                    />
                  ) : (
                    <dd onClick={() => handleEdit('faculty')}>
                      {selectedStudent?.student?.faculty}
                    </dd>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Department</dt>
                  {isEditing.department ? (
                    <input
                      type="text"
                      value={updatedStudent.department || selectedStudent?.student?.department}
                      onChange={(e) => handleChange(e, 'department')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, department: false }))}
                    />
                  ) : (
                    <dd onClick={() => handleEdit('department')}>
                      {selectedStudent?.student?.department}
                    </dd>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Level</dt>
                  {isEditing.level ? (
                    <input
                      type="text"
                      value={updatedStudent.level || selectedStudent?.student?.level}
                      onChange={(e) => handleChange(e, 'level')}
                      onBlur={() => setIsEditing((prev) => ({ ...prev, level: false }))}
                    />
                  ) : (
                    <dd onClick={() => handleEdit('level')}>
                      {selectedStudent?.student?.level}
                    </dd>
                  )}
                </div>
              </dl>
            </div>
            {Object.keys(updatedStudent).length > 0 && isAdmin && (
              <Button onClick={handleSave} className="mt-4">
                Save
              </Button>
            )}
          </CardContent>
        ) : (
          <CardContent className="flex-1 flex items-center justify-center flex-col">
            <RefreshCcwDotIcon className="animate-spin text-black" />
            <p className="text-black">Please select a student to view details</p>
          </CardContent>
        )}
        <div className="text-xs text-muted-foreground">
          {selectedStudent
            ? `Updated: ${format(
                new Date(selectedStudent?.student?.updatedAt),
                "MMMM do, yyyy, hh:mm:ss a"
              )}`
            : null}
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
