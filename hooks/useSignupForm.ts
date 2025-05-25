import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupFormValues } from "@/interfaces/types";
import { signupSchema } from "@/utils/validation";

export const useSignupForm = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setIsButtonActive(Boolean(email && phone && password && confirmPassword));
  }, [email, phone, password, confirmPassword]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    rememberMe,
    setRememberMe,
  };
};
