"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import InputBox from "./input.component copy";
import { ValidationError } from "@/lib/utils";
import useLocalStorage from "use-local-storage";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

interface UserAuthFormProps {
  type: "sign-in" | "sign-up";
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ type }) => {
  const authFormRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const userAuthThroughServer = async (serverRoute: string, formData: any) => {
    try {
      setIsLoading(true);
      // const res = await LOGIN({password: formData.password, username: formData.username})
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });
      if (res?.status === 200) {
        router.push("/");
      }
    } catch (err: any) {
      toast.error("Invalid username or password!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverRoute = type === "sign-in" ? "/signin" : "/signup";

    const form = new FormData(e.target as HTMLFormElement);
    const formData: Record<string, any> = {};

    form.forEach((value, key) => {
      formData[key] = value;
    });

    const { username, password } = formData;

    if (!username || !password) {
      return toast.error("Please fill in the fields");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <section className="h-screen bg-orange-500 flex items-center justify-center">
        <form
          ref={authFormRef}
          className="md:w-[90%] flex flex-col bg-white shadow-2xl rounded-lg p-5 md:py-10 md:px-14 md:max-w-[600px]"
          onSubmit={handleSubmit}
          id="formElement"
        >
          <div className="mx-auto w-24">
            <Image
              width={200}
              height={200}
              alt="logo"
              src={"/uniuyo-logo.png"}
            />
          </div>
          <h1 className="text-xl md:text-4xl font-bold capitalize  text-center">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          <p className="font-semibold text-sm md:text-lg text-center mb-14">
            Please enter your credentials to continue.
          </p>
          {type !== "sign-in" && (
            <InputBox
              disabled={isLoading}
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="user"
            />
          )}

          <InputBox
            disabled={isLoading}
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            icon="username"
          />
          <InputBox
            disabled={isLoading}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            icon="password"
          />

          <button
            disabled={isLoading}
            className="btn-dark bg-orange-700 center relative disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-opacity-100 flex items-center justify-center gap-3 mt-14 w-full"
            type="submit"
          >
            {isLoading && (
              <div className="absolute left-5">
                <Loader className="animate-spin" />
              </div>
            )}
            <div className="">{type.replace(/-/g, " ")}</div>
          </button>
        </form>
      </section>
    </>
  );
};

export default UserAuthForm;
