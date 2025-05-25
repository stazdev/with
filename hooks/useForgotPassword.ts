import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordValues } from "@/interfaces/types";
import { forgotPasswordSchema } from "@/utils/validation";
import { forgetPassword } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const email = watch("email");

  useEffect(() => {
    setIsButtonActive(Boolean(email));
  }, [email]);

  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: (email: string) => forgetPassword(email),
    onError: (error: any) => {
      console.error("Error sending reset link:", error.message);
    },
  });

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    sendResetLink,
    isPending,
    email,
  };
};
