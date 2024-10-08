"use client"
import React, { use, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, PenSquare, Trash, View } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import { StudentColumn } from './columns'
import { toast } from 'sonner'
import { useStudentStore } from '@/context/zustand'
import { DELETE_FROM_ASSESSMENT, DELETESTUDENT, GETSTUDENT } from '@/actions'
import { useSession } from 'next-auth/react'
import { ExitIcon } from '@radix-ui/react-icons'

interface CellActionProps {
    data: StudentColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const {data: session, status} = useSession()
    const adminName = "admin@roxxon"
    const isAdmin = adminName === session?.user?.name
    const setSelectedStudent = useStudentStore((state) => state.setSelectedStudent)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Matric Number Copied!");
      };
      const onDelete = async () => {
        try {
          setLoading(true)
          const res = await DELETESTUDENT(data.matricNumber)
          toast.success("Student deleted")
          setSelectedStudent(null)
        } catch (error) {
          toast.error("Something went wrong!")
        } finally{
          setLoading(false)
          setOpen(false)
        }
      }

      const handleViewClick = async (matricNumber: string) => {
        try {
          const student = await GETSTUDENT(matricNumber)
    
          if (student) {
            setSelectedStudent(student)
          }
        } catch (error) {
          console.error('Failed to fetch student data:', error)
        }
      }

      const handleRemoveAssessment = async (matricNumber: string, id: string) => {
        try {
          const  res = await DELETE_FROM_ASSESSMENT(matricNumber, id)
          if(res?.id){
            toast.success("Assessment removed")
          }
        } catch (error: any) {
          toast.error(error.message)
        }
      }
      
  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={() => onDelete()} />
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
             variant={"ghost"}
             className='h-8 w-8 p-1 '
            >
                <span className='sr-only'>open menu</span>
                <MoreHorizontal className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' >
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuItem className="" onClick={() => onCopy(data.matricNumber)}>
                <Copy className='mr-2 h-4 w-4' />
                Copy Matric
            </DropdownMenuItem>
            <DropdownMenuItem className="" onClick={() => handleViewClick(data.matricNumber)}>
                <View className='mr-2 h-4 w-4' />
                View
            </DropdownMenuItem>
            <DropdownMenuItem className="" onClick={() => handleRemoveAssessment(data.matricNumber,  data.assessmentId as string)}>

                <ExitIcon className='mr-2 h-4 w-4' />
                Remove
            </DropdownMenuItem>
            {
              isAdmin ? (
                <DropdownMenuItem className="" onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4 w-4' />
                Delete
            </DropdownMenuItem>
              ) : null
            }
        </DropdownMenuContent>
       </DropdownMenu>
    </>
  )
}

export default CellAction