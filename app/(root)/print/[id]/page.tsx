

import { GETSTUDENTBYID } from '@/actions'
import Print from '@/components/shared/Print'
import React from 'react'

interface Prop {
    params: {
        id: string
    }
}

const page = async ({params}: Prop) => {
    const student = await GETSTUDENTBYID(params.id)

  return (
    <Print StudentData={student} />
  )
}

export default page