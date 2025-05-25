import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/services/authService";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) => verifyEmail(data),
  });
};
