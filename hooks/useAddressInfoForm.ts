import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressInfoFormValues } from "@/interfaces/types";
import { addressinfoSchema } from "@/utils/validation";

export const useAddressInfoForm = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressInfoFormValues>({
    resolver: yupResolver(addressinfoSchema),
  });

  const billingAddress = watch("billingAddress");
  const shippingAddress = watch("shippingAddress");

  useEffect(() => {
    setIsButtonActive(Boolean(billingAddress && shippingAddress));
  }, [billingAddress, shippingAddress]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
  };
};
