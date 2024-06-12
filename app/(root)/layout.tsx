import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/redux/Providers";
import { DeviceProvider } from "@/context/deviceContext";
import { SessionProviderLayout } from "@/context/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNIUYO GST - BIOMETRIC",
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
          <DeviceProvider>
            <Providers>{children}</Providers>
          </DeviceProvider>
        </SessionProviderLayout>
      </body>
    </html>
  );
}