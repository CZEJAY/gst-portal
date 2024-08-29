"use client"
import React from "react";
import { Provider } from "react-redux";
import { courseStore } from "../store";

export default function CourseProvider({ children }: {children: React.ReactNode}) {
  return( <Provider store={courseStore}>{children}</Provider>)
}
