import Print from "@/components/shared/Print";
import { DeviceProvider } from "@/context/deviceContext";
import React from "react";

const page = () => {
  return (
    <DeviceProvider>
      <Print />
    </DeviceProvider>
  );
};

export default page;
