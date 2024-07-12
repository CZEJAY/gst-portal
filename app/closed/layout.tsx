import { Analytics } from "@vercel/analytics/react"
import "../globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CLOSED - UNIUYO BIOMETRIC',
  description: 'PORTAL CLOSED',
  icons: "/uniuyo-logo.png",
  themeColor: "#000000",
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
      <meta name="ahrefs-site-verification" content="fba97623bebe80a4473a0af978b643e63f0bed20260ee92d5f4e607ed7a10b58"></meta>
      <body className="bg-orange-500">
        {children}
      <Analytics />
      </body>
    </html>
  )
}
