import apiClient from "@/api/apiClient";
import useAuthStore from "@/store/authStore";
import {
  CompleteSignupRequest,
  CompleteSignupResponse,
  SignUpResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "@/interfaces/auth";
import { SigninFormValues, SignupFormValues } from "@/interfaces/types";

const BASE_URL =
  "https://withjaraapp-h5avgudddxeneuam.eastus-01.azurewebsites.net/app/v1/Auth";

export const signUp = async (
  payload: SignupFormValues
): Promise<SignUpResponse> => {
  const apiPayload = {
    email: payload.email,
    phoneNumber: payload.phone,
    password: payload.password,
    confirmPassword: payload.confirmPassword,
  };

  const response = await apiClient.post<SignUpResponse>(
    "Auth/SignUp",
    apiPayload
  );

  if (!response.data.status) {
    throw new Error(response.data.message || "Signup failed");
  }

  // Save email to authStore
  const { setEmail } = useAuthStore.getState();
  setEmail(payload.email);

  return response.data;
};

// export const verifyEmail = async (
//   payload: VerifyEmailRequest
// ): Promise<VerifyEmailResponse> => {
//   const response = await apiClient.post<VerifyEmailResponse>(
//     "Auth/VerifyEmail",
//     payload
//   );

//   if (!response.data.status) {
//     throw new Error(response.data.message || "Verification failed");
//   }

//   return response.data;
// };

export const completeSignup = async (
  payload: CompleteSignupRequest
): Promise<CompleteSignupResponse> => {
  const response = await apiClient.post<CompleteSignupResponse>(
    "Auth/CompleteSignup",
    payload
  );

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to complete signup");
  }

  // Save user data to authStore
  const { setUserData } = useAuthStore.getState();
  setUserData(response.data.data);
  console.log("here", response.data.data);

  return response.data;
};

export const signIn = async (
  payload: SigninFormValues
): Promise<CompleteSignupResponse> => {
  const apiPayload = {
    email: payload.email,
    password: payload.password,
  };

  const response = await apiClient.post<CompleteSignupResponse>(
    "Auth/Login",
    apiPayload
  );

  if (!response.data.status) {
    throw new Error(response.data.message || "Login failed");
  }

  // Save user data and token to authStore
  const { setUserData, setAuthToken } = useAuthStore.getState();
  setUserData(response.data.data);
  setAuthToken(response.data.data.token);
  console.log("here", response.data.data);

  return response.data;
};

export const forgetPassword = async (email: string) => {
  try {
    const response = await apiClient.post(`/Auth/ForgetPassword/${email}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to send reset code."
      );
    }
    throw new Error("An unexpected error occurred.");
  }
};

export const verifyEmail = async (data: { email: string; code: string }) => {
  const response = await apiClient.post("Auth/VerifyEmail", data);

  if (!response.data.status) {
    throw new Error(response.data.message || "Email verification failed");
  }

  return response.data;
};
