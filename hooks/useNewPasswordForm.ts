import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewPasswordFormValues } from "@/interfaces/types";
import { newPasswordSchema } from "@/utils/validation";

export const useNewPasswordForm = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NewPasswordFormValues>({
    resolver: yupResolver(newPasswordSchema),
    mode: "onChange",
  });

  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setIsButtonActive(isValid);
  }, [isValid]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
  };
};
