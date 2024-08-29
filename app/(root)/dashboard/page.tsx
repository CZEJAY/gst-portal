import React from "react";
import NewReg from "../_components/newReg";
import prismadb from "@/lib/prisma";
import { auth } from "@/auth";
import { StudentClient } from "./_components/client";
import { StudentColumn } from "./_components/columns";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import SideComponent from "../_components/SideComponent";
import {
  calculatePercentageChange,
  calculatePercentageChange1,
} from "@/lib/utils";
import ExportBtn from "@/components/ExportBtn";
import ExportToExcel from "@/components/ExportToExcelBtn";

const page = async () => {
  const session = await auth();
  const isAdmin = session?.user?.name === "admin@roxxon";
  const specificDate = new Date(); // You can replace this with any specific date
  const startDate = startOfDay(specificDate);
  const endDate = endOfDay(specificDate);

  // Get current date start and end
  const currentDate = new Date();
  const startOfCurrentDay = startOfDay(currentDate);
  const endOfCurrentDay = endOfDay(currentDate);

  // Get yesterday date start and end
  const yesterdayDate = subDays(currentDate, 1);
  const startOfYesterday = startOfDay(yesterdayDate);
  const endOfYesterday = endOfDay(yesterdayDate);

  const studentsToday = isAdmin
    ? await prismadb.students.findMany({
        where: {
          createdAt: {
            gte: startOfCurrentDay,
            lt: endOfCurrentDay,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prismadb.students.findMany({
        where: {
          registrar: session?.user?.id,
          createdAt: {
            gte: startOfCurrentDay,
            lt: endOfCurrentDay,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  const studentsYesterday = isAdmin
    ? await prismadb.students.findMany({
        where: {
          createdAt: {
            gte: startOfYesterday,
            lt: endOfYesterday,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prismadb.students.findMany({
        where: {
          registrar: session?.user?.id,
          createdAt: {
            gte: startOfYesterday,
            lt: endOfYesterday,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  const students = isAdmin
    ? await prismadb.students.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prismadb.students.findMany({
        where: {
          registrar: session?.user?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  const studentsWithoutFingerprint = isAdmin
    ? await prismadb.students.findMany({
        where: {
          fingerPrint: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prismadb.students.findMany({
        where: {
          fingerPrint: null,
          registrar: session?.user?.id, // Assuming you want to filter by registrar as well
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  const studentsWithFingerprint = isAdmin
    ? await prismadb.students.findMany({
        where: {
          fingerPrint: {
            not: null,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : await prismadb.students.findMany({
        where: {
          fingerPrint: {
            not: null,
          },
          registrar: session?.user?.id, // Assuming you want to filter by registrar as well
        },
        orderBy: {
          createdAt: "desc",
        },
      });

  // Calculate the counts
  const countToday = studentsToday.length;
  const countYesterday = studentsYesterday.length;

  // Calculate the percentage change
  const percentageChange = calculatePercentageChange1(
    countToday,
    countYesterday
  );

  const formattedData: StudentColumn[] = students.map((item) => {
    const formattedCourse = item.courses.map((value) => value).join(" ");
    return {
      surName: item.surName,
      firstName: item.firstName,
      otherName: item.otherName as string,
      // courses: item.courses,
      courses: formattedCourse,
      faculty: item.faculty,
      // email: item.email?.toLocaleLowerCase(),
      department: item.department,
      // level: item.level,
      matricNumber: item.matricNumber,
      phone: item.phone as string,
      // createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });
  return (
    <main className="grid relative flex-1 items-center  gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
      <NewReg
        verified={studentsWithFingerprint.length}
        unverified={studentsWithoutFingerprint.length}
        percentageChange={percentageChange}
        studentsYesterday={countYesterday}
        total={students.length}
        recent={countToday}
      />
      <div className="col-span-1 relative ">
        <div className="absolute right-0  flex items-center top-4 gap-2">
          <ExportBtn data={formattedData} />
          <ExportToExcel data={formattedData} />
        </div>
        <StudentClient data={formattedData} />
      </div>
      <div className="col-span-1 self-baseline">
        <SideComponent />
      </div>
    </main>
  );
};

export default page;
