"use client"
import React, { use, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import { StudentColumn } from './columns'
import { toast } from 'sonner'

interface CellActionProps {
    data: StudentColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Matric Number Copied!");
      };
      const onUpdate = (id: string) => {
        
      }
      const onDelete = async () => {
        try {
          setLoading(true)
          
          toast.success("Student deleted")
        } catch (error) {
          toast.error("Something went wrong!")
        } finally{
          setLoading(false)
          setOpen(false)
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
            <DropdownMenuItem className="" onClick={() => onUpdate(data.matricNumber)}>
                <Edit className='mr-2 h-4 w-4' />
                Update
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