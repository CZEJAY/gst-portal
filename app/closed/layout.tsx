import "../globals.css"

export const metadata = {
  title: 'UNIUYO BIOMETRIC',
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
      <body className="bg-orange-500">{children}</body>
    </html>
  )
}
