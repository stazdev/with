// store/authStore.ts
import { create } from "zustand";

type UserData = {
  authId: string;
  customerId: number;
  fullName: string;
  token: string;
  phoneNumber: string;
  email: string;
};

type AuthStore = {
  authToken: string | null;
  email: string | null;
  userData: UserData | null;
  setAuthToken: (token: string) => void;
  setEmail: (email: string) => void;
  setUserData: (data: UserData) => void;
  clearAuthStore: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  authToken: null,
  email: null,
  userData: null,
  setAuthToken: (token: string) => set({ authToken: token }),
  setEmail: (email: string) => set({ email }),
  setUserData: (data: UserData) => set({ userData: data }),
  clearAuthStore: () => set({ authToken: null, email: null, userData: null }),
}));

export default useAuthStore;
