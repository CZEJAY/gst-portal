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
import { SIGNUP } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Modal from "@/app/closed/_components/mainTime";
import OTPModal from "./otpModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface UserAuthFormProps {
  type: "sign-in" | "sign-up";
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ type }) => {
  const authFormRef = useRef<HTMLFormElement>(null);
  const tabAuthRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState("notice");

  const [value, setValue] = useState("");
  const [validation, setValidation] = useState({ success: "", error: "" });

  useEffect(() => {
    if (value.length >= 6) {
      if (process.env.OTP) {
        setValidation({ success: "OTP is not set", error: "" });
      }
      if (value === "113005") {
        setValidation({ success: "Valid token!", error: "" });
        setShowModal(false)
        setModalState("Auth")
      } else {
        setValidation({ success: "", error: "Invalid token!" });
      }
    }
  }, [value]);
  
  const { data } = useSession();
  const router = useRouter();
  const userAuthThroughServer = async (serverRoute: string, formData: any) => {
    try {
      setIsLoading(true);
      // const res = await LOGIN({password: formData.password, username: formData.username})

      // if(serverRoute === "sign-in"){
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        window.location.reload();
      }

      if (res?.error) {
        toast.error("Invalid credentials!");
      }
      // } else {
      //   const res = await SIGNUP(formData)
      //   if (res?.name) {
      //     toast.success(`${res.name} Registered Successfull`)
      //   }
      // }
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

  const handleSwitch = () => {
    setShowModal(true);
  };
  return (
    <div className="flex items-center flex-col gap-2 bg-blue-400 justify-center w-full h-screen">
      <div className="mx-auto w-24">
        <Image width={200} height={200} alt="logo" src={"/uniuyo-logo.png"} />
      </div>
      {/* grid */}

      {/* OTP MODAL */}

      {/* <OTPModal OnSuccess={() => changePage()} isOpen={showModal} onChange={() => setShowModal(!showModal)} /> */}
      <Dialog open={showModal} onOpenChange={() => setShowModal(!showModal)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              <div className="text-center">
                <h2 className="text-lg tracking-widest font-bold text-black">
                  Enter Authurization Key
                </h2>
                <p className="text-md font text-blue-500">
                  Please enter the key below.
                </p>
              </div>
              <DialogDescription>
                <div className="flex justify-center flex-col items-center mt-1">
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={6}
                      value={value}
                      onChange={(value) => setValue(value)}
                      className="caret-blue-800"
                    >
                      <InputOTPGroup className="text-black caret-blue-800">
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={0}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={1}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={2}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={3}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={4}
                        />
                        <InputOTPSlot
                          className="text-black caret-blue-800 "
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                    <div
                      className={`text-center text-sm  ${
                        validation.success ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {validation.success
                        ? validation.success
                        : validation.error}
                    </div>
                  </div>
                  <div className="md:mt-2 flex items-center mt-auto flex-col">
                    <button
                      type="button"
                      onClick={() => setShowModal(!showModal)}
                      className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>
          <div></div>
        </DialogContent>
      </Dialog>
      
      {/* OTP MODAL */}

      <div className="">
        {modalState === "notice" ? (
          <Modal onClick={() => handleSwitch()} />
        ) : (
          <Card className="min-w-[600px]">
            <CardHeader>
              <CardTitle className="text-blue-400 text-xl md:text-4xl font-bold capitalize  text-center">
                {type === "sign-in" ? "Welcome back" : "Join us today"}
              </CardTitle>
              <CardDescription className="text-blue-400 font-semibold text-sm md:text-lg text-center mb-4">
                Please enter your credentials to continue.
              </CardDescription>
            </CardHeader>
            <form
              ref={authFormRef}
              className=""
              onSubmit={handleSubmit}
              id="formElement"
            >
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <InputBox
                    disabled={isLoading}
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    icon="username"
                  />
                </div>
                <div className="space-y-1">
                  <InputBox
                    disabled={isLoading}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <button
                  disabled={isLoading}
                  className="btn-dark bg-blue-700 center relative disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-opacity-100 flex items-center justify-center gap-3 mt-4 w-full"
                  type="submit"
                >
                  {isLoading && (
                    <div className="absolute left-5">
                      <Loader className="animate-spin" />
                    </div>
                  )}
                  <div className="">{type.replace(/-/g, " ")}</div>
                </button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserAuthForm;
