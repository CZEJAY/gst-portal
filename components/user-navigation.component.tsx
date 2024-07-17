"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignOutSVA } from "@/actions";
import Link from "next/link";
// import { setAppElement } from "react-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// setAppElement("#root");

const UserNavigationPanel = () => {
  const router = useRouter();
  const signOutUser = () => {
    SignOutSVA();
  };
  const { data, status } = useSession();
  const allowedUSers = ["admin@roxxon", "cudoh", "uekwere"];
  return (
    <div className="bg-white flex flex-col  absolute right-0 border border-grey w-60 overflow-hidden duration-200">
      {allowedUSers.includes(data?.user?.name as string) && (
        <Link
          href={"/dashboard"}
          className="p-2 font-bold hover:underline text-xl pl-6"
        >
          Dashboard
        </Link>
      )}
      <Link href={"/qr"} className="text-left font-semibold  hover:underline pl-6 ">
        Scan QR Code
      </Link>
      <Link href={"/register"} className="text-left font-semibold  hover:underline pl-6 ">
        Register
      </Link>
      <button
        className="text-left p-4 border-t hover:bg-grey w-full pl-8 py-4"
        onClick={signOutUser}
      >
        <h1 className="font-bold text-xl mb-1">Sign Out</h1>
        <p className="text-dark-grey">
          {status === "loading" ? "Loading..." : `@${data?.user?.name}`}
        </p>
      </button>
    </div>
  );
};

export default UserNavigationPanel;
