import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninFormValues } from "@/interfaces/types";
import { signinSchema } from "@/utils/validation";

export const useSigninForm = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: yupResolver(signinSchema),
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setIsButtonActive(Boolean(email && password));
  }, [email, password]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    rememberMe,
    setRememberMe,
  };
};
