"use client"
import React, { use, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash, View } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import { StudentColumn } from './columns'
import { toast } from 'sonner'
import { useStudentStore } from '@/context/zustand'
import { DELETESTUDENT, GETSTUDENT } from '@/actions'

interface CellActionProps {
    data: StudentColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
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
      
  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={() => onDelete()} />
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
             variant={"ghost"}
             className='h-8 w-8 p-1 hover:bg-gray-400/15'
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
            <DropdownMenuItem className="" onClick={() => setOpen(true)}>
                <Trash className='mr-2 h-4 w-4' />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    </>
  )
}

export default CellAction