

import React from 'react'
import NewReg from '../_components/newReg'
import prismadb from '@/lib/prisma'
import { auth } from '@/auth'
import { StudentClient } from './_components/client'
import { StudentColumn } from './_components/columns'
import {endOfDay, format, startOfDay, subDays} from "date-fns"
import SideComponent from '../_components/SideComponent'
import { calculatePercentageChange, calculatePercentageChange1 } from '@/lib/utils'


const page = async  () => {
  const session = await auth()
  const isAdmin = session?.user?.name === "admin@roxxon";
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

  const studentsToday = isAdmin ? await prismadb.students.findMany({
    where: {
      createdAt: {
        gte: startOfCurrentDay,
        lt: endOfCurrentDay
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  }) 
  :
  await prismadb.students.findMany({
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
  });

  const studentsYesterday = isAdmin ? await prismadb.students.findMany({
    where: {
      createdAt: {
        gte: startOfYesterday,
        lt: endOfYesterday
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  }) :
  await prismadb.students.findMany({
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
  });
  
  const students = isAdmin ? await prismadb.students.findMany({
    orderBy: {
      createdAt: "desc"
    }
  }) :
  await prismadb.students.findMany({
    where: {
      registrar: session?.user?.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const studentsWithoutFingerprint = isAdmin ? await prismadb.students.findMany({
    where: {
      fingerPrint: null,
    },
    orderBy: {
      createdAt: "desc"
    }
  }) :
  await prismadb.students.findMany({
    where: {
      fingerPrint: null,
      registrar: session?.user?.id // Assuming you want to filter by registrar as well
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const studentsWithFingerprint = isAdmin ? await prismadb.students.findMany({
    where: {
      fingerPrint: {
        not: null
      },
    },
    orderBy: {
      createdAt: "desc"
    }
  }) : await prismadb.students.findMany({
    where: {
      fingerPrint: {
        not: null
      },
      registrar: session?.user?.id // Assuming you want to filter by registrar as well
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  

  // Calculate the counts
  const countToday = studentsToday.length
  const countYesterday = studentsYesterday.length

  // Calculate the percentage change
  const percentageChange = calculatePercentageChange1(countToday, countYesterday)

  const formattedData: StudentColumn[] = students.map((item) => ({
    surName: item.surName,
    firstName: item.firstName,
    otherName: item.otherName as string,
    gender: item.gender,
    faculty: item.faculty,
    email: item.email?.toLocaleLowerCase(),
    department: item.department,
    level: item.level,
    matricNumber: item.matricNumber,
    phone: item.phone as string,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  return (
    <main className="grid relative flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
      <NewReg verified={studentsWithFingerprint.length} unverified={studentsWithoutFingerprint.length}  percentageChange={percentageChange} studentsYesterday={countYesterday} total={students.length} recent={countToday} />
      <div className="static top-0 right-0">
      {/* <SideComponent /> */}
      </div>
      <div className='col-span-2 '>
      <StudentClient data={formattedData} />
      </div>
    </main>
  )
}

export default page