"use client"
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {  useSession } from "next-auth/react";
import { SignOutSVA } from "@/actions";
import Link from "next/link";
// import { setAppElement } from "react-modal";

// setAppElement("#root");

const UserNavigationPanel = () => {
  const router = useRouter()
  const signOutUser = () => {
    SignOutSVA()
  };
 const {data, status} = useSession()
  return (
    <div className="bg-white flex flex-col  absolute right-0 border border-grey w-60 overflow-hidden duration-200">
      
      <Link href={"/dashboard"} className="p-2 font-bold hover:underline text-xl pl-6">
        Dashboard
      </Link>
      <button
        className="text-left p-4 border-t hover:bg-grey w-full pl-8 py-4"
        onClick={signOutUser}
      >
        <h1 className="font-bold text-xl mb-1">Sign Out</h1>
        <p className="text-dark-grey">{status === "loading" ? "Loading..." : `@${data?.user?.name}`}</p>
      </button>
    </div>
  );
};

export default UserNavigationPanel;
