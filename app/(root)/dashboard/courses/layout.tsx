import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import { GET_ALL_COURSE, GETALLASST } from "@/actions";
import { CourseBluePrint } from "./_components/CoursesBluePrint";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN Dashboard - BIOMETRIC",
  description: "BIOMETRIC PORTAL",
  icons: "/uniuyo-logo.png",
};
export const fetchCache = 'force-no-store';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const assessments = await GET_ALL_COURSE()
  const formatted = assessments.map(val => ({
    id: val.id,
    name:  val.name,
    children: val.name
  }))
  return (
    // @ts-ignore
    <CourseBluePrint assess={formatted}>
        {children}
    </CourseBluePrint>
  );
}
