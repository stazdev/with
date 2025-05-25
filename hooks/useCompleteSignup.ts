import { useMutation } from "@tanstack/react-query";
import {
  CompleteSignupRequest,
  CompleteSignupResponse,
} from "@/interfaces/auth";
import { completeSignup } from "@/services/authService";

export const useCompleteSignup = () => {
  return useMutation<CompleteSignupResponse, Error, CompleteSignupRequest>({
    mutationFn: (data: CompleteSignupRequest) => completeSignup(data),
  });
};
