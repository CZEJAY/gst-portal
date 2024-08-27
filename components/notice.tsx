import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Notice = () => {
  return (
    <Dialog defaultOpen>
      <DialogContent className="bg-white">
        <DialogHeader className="text-center  font-bold w-full flex items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl">NOTICE</h1>
          </div>
        </DialogHeader>
        <DialogDescription>
          <div className="p-4 border rounded-md text-white text-xl font-bold tracking-wide text-center bg-red-500">
            <p>Portal Access will close by 8:15 PM Tonight, 27th August 2024.</p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Notice;
