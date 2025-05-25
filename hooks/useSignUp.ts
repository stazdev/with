import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/authService";
import { SignupFormValues } from "@/interfaces/types";

export const useSignUp = (
  onSuccess: (message: string) => void,
  onError: (error: string) => void
) => {
  return useMutation({
    mutationFn: (data: SignupFormValues) => signUp(data),
    onSuccess: (response: any) => {
      const successMessage = response?.message || "Signup successful!";
      onSuccess(successMessage); // Pass success message to the callback
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      onError(errorMessage); // Pass error message to the callback
    },
  });
};
