

import { GETSTUDENTBYID } from '@/actions'
import Print from '@/components/shared/Print'
import React from 'react'
import PrintRoute from './PrintRoute'
// import "../../../globals.css"

interface Prop {
    params: {
        id: string
    }
}

const page = async ({params}: Prop) => {

  return (
    <PrintRoute />
  )
}

export default page