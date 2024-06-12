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
        callbackUrl: "/register",
        // redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid username or password!");
      }
      if (res?.status === 200) {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message);
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
          className="w-[90%] bg-white shadow-2xl rounded-lg py-10 px-14 max-w-[600px]"
          onSubmit={handleSubmit}
          id="formElement"
        >
          <h1 className="text-4xl font-semibold capitalize mb-24 text-center">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
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
            className="btn-dark center relative disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-opacity-100 flex items-center justify-center gap-3 mt-14 w-full"
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
