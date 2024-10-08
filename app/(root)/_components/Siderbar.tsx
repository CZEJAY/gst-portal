"use client";
import { Links } from "@/constants";
import clsx from "clsx";
import {
  ArrowLeftCircle,
  Bolt,
  LucideArrowRightCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useActiveRoute, useTrigger } from "@/context/zustand/index";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Siderbar = () => {
  const params = usePathname();
  const { toggleIsOpen, isOpen } = useTrigger();
  // console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const {activeName, setActiveRoute} = useActiveRoute()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleIsOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleIsOpen]);
  return (
    <div
      className={clsx(
        "leftsidebar1 transition-all duration-300",
        isOpen && "w-60 transition-all duration-300"
      )}
    >
      <div className="flex items-center  pl-1">
        <div className="">
          <div className="flex w-32 items-center justify-center rounded-full z-40">
            <Bolt size={30} />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "w-full mb-auto flex flex-col gap-7 items-center justify-center pt-10"
        )}
      >
        {Links.map((item, index) => {
          const { icon: Icon, pathname, label } = item;
          const isActive = label === activeName;
          return (
            <div
            key={index}
            className="bg-none w-full" onClick={() => setActiveRoute(label)}>
              <Link
              href={pathname}
              className={clsx(
                "relative text-dark-1 w-full pl-10 flex items-center gap-9 cursor-pointer hover:dark:text-light-1  transition-all duration-200",
                isActive && "text-white dark:bg-dark-1 bg-blue-500 py-3"
              )}
            >
              <div className="">
                <Icon
                  className={clsx(isActive && "text-light-1")}
                />
              </div>
              <div className="">
                <span
                  className={clsx(
                    "transition-all duration-400 hidden font-normal text-lg",
                    isActive && "text-light-1",
                    isOpen && "opacity-100 !flex"
                  )}
                >
                  {label}
                </span>
              </div>
              {isActive && (
                <span className="absolute h-7 w-1 bg-light-1 right-0 top-[11.5px] rounded-tl rounded-bl transition-all duration-300"></span>
              )}
            </Link>
            </div>
          );
        })}

        
      </div>

      <div className="flex gap-6 flex-col text-dark-1 w-full pl-10">
        <div className="flex items-center gap-9">
          <div className="">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <LucideArrowRightCircle
                    onClick={toggleIsOpen}
                    className={clsx(
                      "cursor-pointer rotate-0 hover:dark:text-light-1 hover:text-dark-1 transition-all duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-blue-500">⌘ x toggle sidebar </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isOpen && (
            <span
              className={clsx(
                "transition-all duration-400 hidden text-sm",
                isOpen && "!block"
              )}
            >
              Toggle
            </span>
          )}
        </div>
        <Link href={"/dashboard/settings"} className="flex items-center gap-9">
          <div className="">
            <Settings
              className={clsx(
                "cursor-pointer hover:dark:text-light-1 hover:text-dark-1 transition-all duration-200 ",
                isOpen && "rotate-180"
              )}
            />
          </div>
          {isOpen && (
            <span
              className={clsx(
                "transition-all duration-400 opacity-0 text-sm",
                isOpen && "!opacity-100"
              )}
            >
              Settings
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Siderbar;
