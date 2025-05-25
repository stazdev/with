import { useMutation } from "@tanstack/react-query";
import { SigninFormValues } from "@/interfaces/types";
import { signIn } from "@/services/authService";

export const useSignin = () => {
  return useMutation({
    mutationFn: (data: SigninFormValues) => signIn(data),
  });
};
