import { create } from 'zustand';
import { IUser } from '@/globalContext/globalContext';

export const useNewListingContext = create<{
  step: number;
  services: Partial<IUser["services"][number]> & { imageFiles?: FileList; images?: string[] };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setListingData: (data: Partial<IUser["services"][number]> & { imageFiles?: FileList; images?: string[]; }) => void;
}>((set) => ({
  step: 0,
  services: {
  },
  setStep: (step: number) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setListingData: (data: Partial<IUser['services'][number]>) =>
    set((state) => ({ services: { ...state.services, ...data } })),
}));
