import { registrars, students } from "@prisma/client";
import { create } from "zustand";

export type StudentWithRegistrar = students & {
  registrarRel?: registrars;
  studentCounts?: number;
};

export type FormattedStudent = {
  student: StudentWithRegistrar | null;
  studentsCount?: number;
};
interface IStore {
  isOpen: boolean;
  setIsOpen: () => void;
  toggleIsOpen: () => void;
}

export const useTrigger = create<IStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set({ isOpen: true }),
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface StudentStore {
  selectedStudent: FormattedStudent | null;
  setSelectedStudent: (student: FormattedStudent | null) => void;
  clearSelectedStudent: () => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  selectedStudent: null,
  setSelectedStudent: (student) => set({ selectedStudent: student }),
  clearSelectedStudent: () => set({ selectedStudent: null }),
}));
