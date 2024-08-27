import { Analytics } from "@vercel/analytics/react"
import "../globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CLOSED - UNIUYO BIOMETRIC',
  description: 'PORTAL CLOSED',
  icons: "/uniuyo-logo.png",
  verification: {
    me: "fba97623bebe80a4473a0af978b643e63f0bed20260ee92d5f4e607ed7a10b58"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-blue-400 w-screen items-center justify-center h-screen">
        {children}
      <Analytics />
      </body>
    </html>
  )
}
