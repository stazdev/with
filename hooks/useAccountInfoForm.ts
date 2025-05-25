// useAccountInfoForm.ts
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccountInfoFormValues } from "@/interfaces/types";
import { accountinfoSchema } from "@/utils/validation";
import { useState, useEffect } from "react";

export const useAccountInfoForm = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<AccountInfoFormValues>({
    resolver: yupResolver(accountinfoSchema),
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
    },
  });

  const fullName = watch("fullName");
  const dob = watch("dob");
  const gender = watch("gender");

  useEffect(() => {
    setIsButtonActive(Boolean(fullName && dob && gender));
  }, [fullName, dob, gender]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    getValues,
  };
};
