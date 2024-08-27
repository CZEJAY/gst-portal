import React from "react";
import Link from "next/link";
import UserButton from "./UserButton";
import { auth } from "@/auth";
import Notice from "./notice";
const NavBar = async () => {
  const session = await auth()
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
        <Notice />
      </nav>
    </>
  );
};

export default NavBar;
