import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import { BluePrint } from "./_components/BluePrint";
import { GETALLASST } from "@/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN Dashboard - BIOMETRIC",
  description: "BIOMETRIC PORTAL",
  icons: "/uniuyo-logo.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const assessments = await GETALLASST()
  return (
    <BluePrint assess={assessments}>
        {children}
    </BluePrint>
  );
}
