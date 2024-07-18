"use client"
import UserButton from "@/components/UserButton";
import { BellIcon,  ChevronDown, } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const Header =  () => {
  const { data } = useSession()
  return (
    <nav className="topbar1">
      <div className="hidden lg:flex text-blue-800 dark:text-light-1 text-xl font-semibold font-['Plus Jakarta Sans'] leading-7">
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <div className="justify-between md:justify-end gap-10 items-center flex w-full lg:w-[70%]  ">
        
        {/* <div className="max-sm:hidden">
          <SearchInput />
        </div> */}
        <div className="flex items-center justify-center border p-1 border-neutral-500/20 rounded-full text-zinc-800 dark:text-light-1">
          <BellIcon />
        </div>
        <div className="justify-center items-center gap-3 flex relative">
          <div className="justify-center items-center flex">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
