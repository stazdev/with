import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddDeliveryAddressValues } from "@/interfaces/types";
import { addDeliveryAddressSchema } from "@/utils/validation";

export const useAddDeliveryAddress = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddDeliveryAddressValues>({
    resolver: yupResolver(addDeliveryAddressSchema),
  });

  const email = watch("email");
  const phone = watch("phone");
  const address = watch("address");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const postCode = watch("postCode");
  const city = watch("city");
  const country = watch("country");

  useEffect(() => {
    setIsButtonActive(
      Boolean(
        email && phone && address && firstName && lastName && city && country
      )
    );
  }, [email, phone, address, firstName, lastName, city, country]);

  return {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    rememberMe,
    setRememberMe,
  };
};
