import { students } from "@prisma/client";
import { create} from "zustand"
interface IStore {
  isOpen: boolean;
  setIsOpen: () => void;
  toggleIsOpen: () => void;
}

export const useTrigger = create<IStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: true })),
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));


interface StudentStore {
  selectedStudent: students | null
  setSelectedStudent: (student: students) => void
  clearSelectedStudent: () => void
}

export const useStudentStore = create<StudentStore>((set) => ({
  selectedStudent: null,
  setSelectedStudent: (student) => set({ selectedStudent: student }),
  clearSelectedStudent: () => set({ selectedStudent: null })
}))