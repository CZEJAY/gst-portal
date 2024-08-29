"use client"
import React from "react";
import Link from "next/link";
import UserButton from "./UserButton";
import Notice from "./notice";
import MatricModal from "./shared/MatricModal";
import { useSession } from "next-auth/react";
import { useMatricModal, useVariationModal } from "@/hooks/useMatricModal";
import CheckDateString from "./shared/CheckDateString";
const NavBar = () => {
  const {data: session} = useSession()
  const {isOpen, onClose, onOpen} = useMatricModal()
  const {isOpen: variationModalOpen, onClose: closeVariation, onOpen: openVariation} = useVariationModal()
  return (
    <>
      <nav className="navbar relative">
        <Link href={"/"} className="flex-none w-20">
          <img src={"/uniuyo-logo.png"} alt="logo" className="" />
        </Link>


        <div className="flex items-center gap-3 md:gap-6 ml-auto">

          {session?.user ? (
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
        {/* <Notice /> */}
        <MatricModal
          isOpen={isOpen}
          onChange={onClose}
          OnSuccess={() => {}}
        />
        <CheckDateString
          isOpen={variationModalOpen}
          onChange={closeVariation}
          OnSuccess={() => {}}
        />
      </nav>
    </>
  );
};

export default NavBar;
