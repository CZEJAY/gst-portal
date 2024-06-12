
import {create, createStore} from "zustand"





export const useFormEventStore = create((set) => ({
  isOpen: false,
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}));
