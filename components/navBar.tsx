"use client"
import React, { useContext, useState } from "react";
import UserNavigationPanel from "./user-navigation.component";
import { UserCircle } from 'lucide-react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
const NavBar = () => {
  const [searcBoxVisible, setSearhBoxVisible] = useState(false);
  const [isModalActive, setIsModalAtive] = useState(false);
  const router = useRouter();
  const {
    data
  } = useSession();

  const handleUserNavPanel = () => {
    setIsModalAtive((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsModalAtive(false);
    }, 200);
  };

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

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1 relative">
                  <UserCircle size={40} />
                </button>
                {isModalActive ? <UserNavigationPanel /> : null}
              </div>
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
