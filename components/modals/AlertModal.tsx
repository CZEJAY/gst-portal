"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { Loader } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal tittle="Are you sure"
    description="This action can not be undone"
    isOpen={isOpen}
    onclose={onClose}

    >
        <div className="pt-6 space-x-6 flex items-center justify-end w-full">
            <Button variant={"outline"} disabled={loading} onClick={onClose}>
                Cancel
            </Button>
            <Button variant={"destructive"} disabled={loading} onClick={onConfirm}>
                {
                  loading && <Loader className="animate-spin" />
                }Continue
            </Button>
        </div>

    </Modal>
  )
};

export default AlertModal;
