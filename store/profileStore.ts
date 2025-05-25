import { create } from "zustand";

type ProfileData = {
  email: string;
  fullName: string;
  phoneNumber: string;
  gender: string;
  profileImage: string;
  bio: string;
  dateOfBirth: string;
};

type ProfileStore = {
  profileData: ProfileData | null;
  setProfileData: (data: ProfileData) => void;
  clearProfileData: () => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  profileData: null,
  setProfileData: (data: ProfileData) => set({ profileData: data }),
  clearProfileData: () => set({ profileData: null }),
}));

export default useProfileStore;
