import { create } from "zustand";

interface ProfileCreationData {
  name: string;
  username: string;
  phone: string;
  city: string;
  role: string;
  address: string;
  picture?: string;
  experience?: string;
  type?: string;
  status?: string;
  categories: string[];
}

const is_verified =
  (typeof window !== "undefined"
    ? document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("is_verified"))
        ?.split("=")
        .at(-1)
    : "") === "true";

export const useProfileCreationContext = create<{
  step: number;
  is_verified?: boolean;
  codeRequested: boolean;
  data: Partial<ProfileCreationData>;
  setStep: (step: number) => void;
  setData: (data: Partial<ProfileCreationData>) => void;
  setCodeRequested: (codeRequested: boolean) => void;
  nextStep: () => void;
  createProfile: () => Promise<void>;
}>((set, get) => ({
  step: 0,
  is_verified,
  codeRequested: false,
  data: {},
  setStep: (step: number) => set({ step }),
  setCodeRequested: (codeRequested: boolean) => set({ codeRequested }),
  setData: (data: Partial<ProfileCreationData>) =>
    set((prev) => ({ data: { ...prev.data, ...data } })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  createProfile: async () => {
    const id = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("id"))
      ?.split("=")
      .at(-1);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/onboard/${id}`,
      {
        method: "POST",
        body: JSON.stringify(get().data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  },
}));
