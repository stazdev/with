import apiClient from "@/api/apiClient";
import { GetProfileResponse } from "@/interfaces/types";
import useProfileStore from "@/store/profileStore";

export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await apiClient.get<GetProfileResponse>(
    "Account/get-profile"
  );

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to fetch profile");
  }

  // Save profile data to profileStore
  const { setProfileData } = useProfileStore.getState();
  setProfileData(response.data.data);

  return response.data;
};

export const updateProfile = async (profileData: {
  fullName: string;
  phoneNumber: string;
  gender: string;
  photo: string;
  bio: string;
  dateOfBirth: string;
}): Promise<{ status: boolean; message: string; statusCode: number }> => {
  const response = await apiClient.patch<{
    status: boolean;
    message: string;
    statusCode: number;
  }>("Account/update-profile", profileData);

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to update profile");
  }

  // Update profile data in profileStore
  const { setProfileData } = useProfileStore.getState();
  setProfileData(profileData);

  return response.data;
};

export const changePassword = async (passwordData: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ status: boolean; message: string; statusCode: number }> => {
  const response = await apiClient.post<{
    status: boolean;
    message: string;
    statusCode: number;
  }>("Account/change-password", passwordData);

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to change password");
  }

  return response.data;
};

export const getNotificationSettings = async (): Promise<{
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    isPromoDiscount: boolean;
    isPayment: boolean;
    isAppUpdate: boolean;
    isNewStoresProducts: boolean;
    isOrderStatus: boolean;
    isDeliveryStatus: boolean;
    isExpiredVouchers: boolean;
    isOrderTracking: boolean;
  };
}> => {
  const response = await apiClient.get<{
    status: boolean;
    statusCode: number;
    message: string;
    data: {
      isPromoDiscount: boolean;
      isPayment: boolean;
      isAppUpdate: boolean;
      isNewStoresProducts: boolean;
      isOrderStatus: boolean;
      isDeliveryStatus: boolean;
      isExpiredVouchers: boolean;
      isOrderTracking: boolean;
    };
  }>("Account/notification-settings");

  if (!response.data.status) {
    throw new Error(
      response.data.message || "Failed to fetch notification settings"
    );
  }

  return response.data;
};

export const updateNotificationSettings = async (settings: {
  isPromoDiscount: boolean;
  isPayment: boolean;
  isAppUpdate: boolean;
  isNewStoresProducts: boolean;
  isOrderStatus: boolean;
  isDeliveryStatus: boolean;
  isExpiredVouchers: boolean;
  isOrderTracking: boolean;
}): Promise<{ status: boolean; message: string; statusCode: number }> => {
  const response = await apiClient.patch<{
    status: boolean;
    message: string;
    statusCode: number;
  }>("Account/update-notification-settings", settings);

  if (!response.data.status) {
    throw new Error(
      response.data.message || "Failed to update notification settings"
    );
  }

  return response.data;
};
