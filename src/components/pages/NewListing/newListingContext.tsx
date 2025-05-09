import { create } from 'zustand';
import { IUser } from '@/globalContext/globalContext';

export const useNewListingContext = create<{
  step: number;
  listing: Partial<IUser["listings"][number]> & { imageFiles?: FileList; images?: string[] };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setListingData: (data: Partial<IUser["listings"][number]> & { imageFiles?: FileList; images?: string[] }) => void;
}>((set) => ({
  step: 0,
  listing: {
    images: [],
    // email: "email@example.com",
    // phone: "04XX XXX XXX",
    // title: "Listing title",
    // category: "Accounting",
    // location: "Sydney",
    // description:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sem leo, suscipit eget elit porttitor, volutpat consequat turpis. In interdum mauris et urna maximus, sed tincidunt nulla porta. Maecenas congue risus enim. Quisque egestas augue sem, nec egestas leo mattis ut. Phasellus non sem eu massa finibus volutpat. Vestibulum condimentum augue odio, in dapibus erat vehicula ut. \n\nPraesent ac massa at urna dignissim iaculis egestas ut felis. Nullam pharetra, lorem non congue fringilla, nisl ex ullamcorper nibh, nec vehicula nulla libero id dui. Pellentesque bibendum pulvinar tempor. Fusce sodales tincidunt ex, non aliquet arcu consectetur posuere. Mauris suscipit auctor tempor. Phasellus a finibus felis, vel porta nibh. Ut laoreet purus sed enim feugiat, non bibendum nunc semper. Cras aliquam velit in tincidunt pulvinar. Morbi vitae dictum nibh. \n\nSed viverra nunc sit amet libero tincidunt euismod.",
    // keywords: ["Accounting", "Fixed Rate"],
    // tasks: ["Task 1", "Task 2", "Task 3"],
    // priceType: "Fixed Rate",
    // price: "50",
    // start_date: "01.01.24",
    // end_date: "05.01.24",
    // duration: "1 week",
    // images: [
    //   "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    //   "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    // ],
  },
  setStep: (step: number) => set({ step }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setListingData: (data: Partial<IUser['listings'][number]>) =>
    set((state) => ({ listing: { ...state.listing, ...data } })),
}));
