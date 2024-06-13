

import React from 'react'
import NewReg from '../_components/newReg'
import prismadb from '@/lib/prisma'
import { auth } from '@/auth'
import { StudentClient } from './_components/client'
import { StudentColumn } from './_components/columns'
import {endOfDay, format, startOfDay, subDays} from "date-fns"


const page = async  () => {
  const session = await auth()

  const specificDate = new Date() // You can replace this with any specific date
  const startDate = startOfDay(specificDate)
  const endDate = endOfDay(specificDate)

  // Get current date start and end
  const currentDate = new Date()
  const startOfCurrentDay = startOfDay(currentDate)
  const endOfCurrentDay = endOfDay(currentDate)
  
  // Get yesterday date start and end
  const yesterdayDate = subDays(currentDate, 1)
  const startOfYesterday = startOfDay(yesterdayDate)
  const endOfYesterday = endOfDay(yesterdayDate)

  const studentsToday = await prismadb.students.findMany({
    where: {
      registrar: session?.user?.id,
      createdAt: {
        gte: startOfCurrentDay,
        lt: endOfCurrentDay
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const studentsYesterday = await prismadb.students.findMany({
    where: {
      registrar: session?.user?.id,
      createdAt: {
        gte: startOfYesterday,
        lt: endOfYesterday
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  
  const students = await prismadb.students.findMany({
    where: {
      registrar: session?.user?.id
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  // Calculate the counts
  const countToday = studentsToday.length
  const countYesterday = studentsYesterday.length

  // Calculate the percentage change
  const percentageChange = countYesterday === 0 
    ? 100 
    : ((countToday - countYesterday) / countYesterday) * 100

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
      <NewReg percentageChange={percentageChange} studentsYesterday={countYesterday} total={students.length} recent={countToday} />
      <div className='col-span-2'>
      <StudentClient data={formattedData} />
      </div>
    </main>
  )
}

export default page