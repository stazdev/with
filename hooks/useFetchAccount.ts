import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  changePassword,
  getNotificationSettings,
  updateNotificationSettings,
} from "@/services/accountService";

export const useFetchAccount = () => {
  return useQuery({
    queryKey: ["accountProfile"],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountProfile"]);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useFetchNotificationSettings = () => {
  return useQuery({
    queryKey: ["notificationSettings"],
    queryFn: getNotificationSettings,
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(["notificationSettings"]);
    },
  });
};
