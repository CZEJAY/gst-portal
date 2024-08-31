
import React from 'react'
import { AssessmentForm } from '../_components/AssementForm'
import prismadb from '@/lib/prisma'

const page = async () => {
    const courses = await prismadb.assessmentCourses.findMany()
  return (
    <div className="px-80">
        <AssessmentForm courses={courses}  />
    </div>
  )
}

export default page