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
} from "@/components/ui/dialog";
import { Alert } from "./ui/alert";
import { AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import MatricModal from "./shared/MatricModal";

import { useMatricModal, useVariationModal } from "@/hooks/useMatricModal";

// setAppElement("#root");

const UserNavigationPanel = () => {
  const signOutUser = () => {
    SignOutSVA();
  };
  const { data, status } = useSession();
  const { onOpen } = useMatricModal();
  const { onOpen: openVariation } = useVariationModal();
  const allowedUSers = ["admin@roxxon", "cudoh", "uekwere"];
  const router = useRouter(); // Initialize the router

  // Function to handle revalidation
  const handleRevalidate = () => {
    router.refresh(); // This will revalidate the page by refreshing it
  };
  return (
    <>
      <div className="absolute z-50"></div>
      <div className="bg-white flex flex-col rounded-md absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <div className="text-muted-foreground w-full text-center mx-auto border-b">
          Account Management
        </div>
        {allowedUSers.includes(data?.user?.name as string) && (
          <Link href={"/dashboard"} className="p-1 hover:bg-gray-400/5 pl-6">
            Dashboard
          </Link>
        )}
        <Link href={"/qr"} className="p-1 text-left hover:bg-gray-400/5 pl-6 ">
          Scan QR
        </Link>
        <button onClick={handleRevalidate} className="p-1 text-left hover:bg-gray-400/5 pl-6 ">
          Refresh Data
        </button>
        <Link
          href={"/register"}
          className="p-1 text-left hover:bg-gray-400/5 pl-6 "
        >
          Register
        </Link>
        <div
          onClick={onOpen}
          className="p-1 text-left hover:bg-gray-400/5 pl-6"
        >
          Print
        </div>
        <div
          onClick={openVariation}
          className="p-1 text-left hover:bg-gray-400/5 pl-6"
        >
          Check Date
        </div>

        <button
          className="text-left p-2 border-t hover:bg-grey-400/5 w-full pl-8"
          onClick={signOutUser}
        >
          <h1 className="font-semibold hover:bg-grey mb-1">Log Out</h1>
          {/* <p className="text-dark-grey">
          {status === "loading" ? "Loading..." : `${data?.user?.name}`}
        </p> */}
        </button>
      </div>
    </>
  );
};

export default UserNavigationPanel;
