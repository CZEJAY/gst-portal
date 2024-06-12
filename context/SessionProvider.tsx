"use client"
import { Session } from "next-auth";
import { SessionContext, SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const SessionProviderLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
