export const metadata = {
  title: 'UNIUYO BIOMETRIC',
  description: 'PORTAL CLOSED',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
