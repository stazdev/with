import React from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { theme } from "@/constants/theme";
import {
  EnvelopGreyIcon,
  InactiveEnvelopIcon,
  EnvelopIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";

import { ForgotPasswordValues } from "@/interfaces/types";

interface ForgotPasswordProps {
  control: Control<ForgotPasswordValues>;
  errors: any;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Email Address"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            icon={<EnvelopGreyIcon />}
            onFocusIcon={<InactiveEnvelopIcon />}
            validatedIcon={<EnvelopIcon />}
            style={errors.email ? styles.errorInput : {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 40,
    marginTop: 30,
    gap: 24,
    padding: 16,
  },
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
});
