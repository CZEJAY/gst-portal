"use client"
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserButton from "./UserButton";
const NavBar = () => {
  const {
    data
  } = useSession();

  

  return (
    <>
      <nav className="navbar">
        <Link href={"/"} className="flex-none w-20">
          <img src={"/uniuyo-logo.png"} alt="logo" className="" />
        </Link>


        <div className="flex items-center gap-3 md:gap-6 ml-auto">

          {data?.user?.name ? (
            <>
              {/* <Link to={"/dashboard/notification"}>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-grey relative hover:bg-black/10">
                  <FaBell className="block mt-1" />
                </button>
              </Link> */}

              <UserButton />
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" href={"/auth/login"}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
