"use client";

import React from "react";
import { Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";

interface ModalProps{
    tittle: string;
    description: string;
    isOpen: boolean;
    onclose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    tittle,
    description,
    isOpen,
    onclose,
    children,
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onclose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {tittle}
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
};