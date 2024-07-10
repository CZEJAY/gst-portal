import { CheckCircle, LucideThumbsUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface SuccessModalProps {
  matricNumber: string;
  firstname: string;
  surname: string;
  othername: string;
  id: string;
  isOpen: boolean;
  onChange: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  matricNumber,
  firstname,
  surname,
  othername,
  isOpen,
  onChange,
  id
}) => {
  const router = useRouter();

  const handlePrint = () => {
    router.push(`/print/${id}`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              <div className="text-center">
                <h2 className="text-lg md:text-5xl font-bold text-emerald-500">
                  Success!
                </h2>
                <p className="text-md md:text-xl font-semibold text-emerald-400">
                  Your registration has been successfully submitted.
                </p>
              </div>
              <DialogDescription>
                <div className="flex justify-center flex-col items-center mt-1">
                  <div className="text-center ">
                    <CheckCircle className="text-emerald-500 text-2xl md:text-4xl" />
                  </div>
                  <div className="text-lg text-black font-semibold capitalize">
                    {surname.toUpperCase()} {firstname.toUpperCase()},{" "}
                    {othername.toUpperCase()}
                  </div>
                  <div className="text-lg text-orange-900 font-semibold capitalize">
                    {matricNumber}
                  </div>
                  
                  <div className="">
                    <LucideThumbsUp size={40} className="text-emerald-500" />
                  </div>
                  <div className="md:mt-2 flex items-center mt-auto flex-col">
                    <p className="font-bold text-sm text-center text-black leading-6 ml-2">
                      Please proceed with this page to the GST office to enroll your fingerprint.
                    </p>
                    <button
                      type="button"
                      onClick={onChange}
                      className="bg-orange-900 text-white font-bold py-2 px-4 rounded"
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
    </>
  );
};

export default SuccessModal;
