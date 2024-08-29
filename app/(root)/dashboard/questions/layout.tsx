import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import { GETALLASST } from "@/actions";
import { QuestionBluePrint } from "../assessments/_components/QuestionBluePrint";

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
    <QuestionBluePrint assess={assessments}>
        {children}
    </QuestionBluePrint>
  );
}
