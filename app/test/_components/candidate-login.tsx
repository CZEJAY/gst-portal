"use client";
import { LOGINCANDIDATE } from "@/actions";
import { Input } from "@/components/ui/input";
import { useCandidateAuth } from "@/context/CandidateAuthContext";
import Image from "next/image";
import React, { useState } from "react";

const CandidateLogin: React.FC = () => {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({ success: "", error: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useCandidateAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error, student } = await LOGINCANDIDATE(matric, password);
      if (error) {
        setValidation({
          success: "",
          error: error,
        });
      }
      if (student) {
        login(
          `${student.surName} ${student.firstName}`,
          student.id,
          student.image
        );
      }
    } catch (error: any) {
      setValidation({
        success: "",
        error: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-lg h-screen w-screen flex items-center flex-col justify-center mx-auto space-y-4"
    >
      <div className="mx-auto w-24">
        <Image width={200} height={200} alt="logo" src={"/uniuyo-logo.png"} />
      </div>
      <h1 className="font-bold text-2xl tracking-wide">CHEMISTRY CBT</h1>
      <div className=" w-full shadow-xl border rounded-md p-6  gap-4 flex flex-col ">
        <div>
          <label
            htmlFor="matric"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Matric
          </label>
          <Input
            type="text"
            id="matric"
            value={matric}
            onChange={(e) => setMatric(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-14"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Password
          </label>
          <Input
            type="text"
            id="name"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-14"
            required
          />
        </div>
        <div
          className={`text-center text-lg font-bold  ${
            validation.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {validation.success ? validation.success : validation.error}
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default CandidateLogin;
