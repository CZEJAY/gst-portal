

import React from 'react'
import NewReg from '../_components/newReg'
import prismadb from '@/lib/prisma'
import { auth } from '@/auth'
import { StudentClient } from './_components/client'
import { StudentColumn } from './_components/columns'
import {format} from "date-fns"


const page = async  () => {
  const session = await auth()
  const students = await prismadb.students.findMany({
    where: {
      registrar: session?.user?.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const formattedData: StudentColumn[] = students.map((item) => ({
    surName: item.surName,
    firstName: item.firstName,
    otherName: item.otherName as string,
    gender: item.gender,
    faculty: item.faculty,
    department: item.department,
    level: item.level,
    matricNumber: item.matricNumber,
    phone: item.phone as string,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <NewReg total={students.length} />
      <div className='col-span-2'>
      <StudentClient data={formattedData} />
      </div>
    </main>
  )
}

export default page