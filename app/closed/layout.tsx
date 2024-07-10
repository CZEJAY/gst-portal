import { Analytics } from "@vercel/analytics/react"
import "../globals.css"

export const metadata = {
  title: 'CLOSED - UNIUYO BIOMETRIC',
  description: 'PORTAL CLOSED',
  icons: "/uniuyo-logo.png",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <body className="bg-orange-500">{children}</body>
    </html>
  )
}
