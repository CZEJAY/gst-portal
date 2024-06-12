

import React from 'react'
import NewReg from '../_components/newReg'
import { getSession } from 'next-auth/react'
import prismadb from '@/lib/prisma'

const page = async  () => {
  const session = await getSession()
  const user = await prismadb.registrars.findMany({
    where: {
      id: session?.user?.id
    },
    include: {
      students: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <NewReg />
    </main>
  )
}

export default page