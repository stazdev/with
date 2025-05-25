import React from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { theme } from "@/constants/theme";
import {
  PersonGreyIcon,
  PersonActiveIcon,
  CalendarGreyIcon,
  CalendarActiveIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";
import { AddressInfoFormValues } from "@/interfaces/types";

interface AddressInfoFormProps {
  control: Control<AddressInfoFormValues>;
  errors: any;
}

export const AddressInfoForm: React.FC<AddressInfoFormProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="shippingAddress"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <JaraInput
              placeholder="shipping address"
              value={value}
              onChangeText={onChange}
              error={errors.shippingAddress?.message}
              icon={<PersonGreyIcon />}
              onFocusIcon={<PersonActiveIcon />}
              validatedIcon={<PersonActiveIcon />}
              style={errors.shippingAddress ? styles.errorInput : {}}
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="billingAddress"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <JaraInput
              placeholder="billing address (optional)"
              value={value}
              onChangeText={onChange}
              error={errors.billingAddress?.message}
              icon={<CalendarGreyIcon />}
              onFocusIcon={<CalendarActiveIcon />}
              validatedIcon={<CalendarActiveIcon />}
              style={errors.billingAddress ? styles.errorInput : {}}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
    gap: 24,
    padding: 16,
    flexGrow: 1,
  },
  inputContainer: {
    flexShrink: 1,
  },
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
  submitButton: {
    width: "80%",
    alignSelf: "center",
    marginTop: 32,
  },
});
