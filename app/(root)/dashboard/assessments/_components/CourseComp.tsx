"use client"

import React from 'react'
import { StudentColumn } from './columns'
import { StudentClient } from './client'
import AddStudent from './AddStudent'

const CourseComp = ({data, formattedData}:{data:any, formattedData: StudentColumn[]}) => {
  // console.log("first", data)
  return (
    <div className='grid gap-6 grid-cols-2'>
        <div className="col-span-2">
            <div className="flex items-center gap-2">
                <p className="text-xl font-bold">{data.name}</p>|
                <p className="text-lg">Candidates ({formattedData.length})</p>
            </div>
            <StudentClient data={formattedData} />
        </div>
        <div className="grid-cols-2">
            <AddStudent data={data} />
        </div>
    </div>
  )
}

export default CourseComp