import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/redux/Providers";
import { DeviceProvider } from "@/context/deviceContext";
import { SessionProviderLayout } from "@/context/SessionProvider";
import { Analytics } from "@vercel/analytics/react"
import NavBar from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scan QR Code - BIOMETRIC",
  description: "BIOMETRIC PORTAL",
  icons: "/uniuyo-logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderLayout>
            <Providers>
              <NavBar />
              {children}
            </Providers>
        </SessionProviderLayout>
      <Analytics />
      </body>
    </html>
  );
}
