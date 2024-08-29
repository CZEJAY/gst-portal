import { create } from "zustand";

interface useStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useMatricModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
export const useVariationModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
export const useAssessmentModal = create<useStoreModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
 