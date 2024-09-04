"use client"

import React, { ReactNode } from 'react'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

type Props = {
    children: ReactNode
}

const ReactQueryProvider = ({children}: Props) => {
    const client = new QueryClient()
  return (
    <QueryClientProvider client={client} >
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider;