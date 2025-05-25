import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { theme } from "@/constants/theme";
import {
  PasswordGreyIcon,
  PasswordBlackIcon,
  PasswordActiveIcon,
  EyeIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";
import { NewPasswordFormValues } from "@/interfaces/types";
import { TouchableOpacity } from "react-native-gesture-handler";

interface NewPasswordFormProps {
  control: Control<NewPasswordFormValues>;
  errors: any;
}

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  control,
  errors,
}) => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="currentPassword"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Current Password"
            placeholder="XXXXXXXXXX"
            value={value}
            variant="filled"
            secureTextEntry={!currentPasswordVisible}
            onChangeText={onChange}
            error={errors.currentPassword?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  setCurrentPasswordVisible(!currentPasswordVisible)
                }
              >
                <EyeIcon />
              </TouchableOpacity>
            }
            style={errors.currentPassword ? styles.errorInput : {}}
          />
        )}
      />
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.black_5,
          marginVertical: 16,
          width: "100%",
        }}
      />
      <Controller
        control={control}
        name="newPassword"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="New Password"
            placeholder="XXXXXXXXXX"
            value={value}
            variant="filled"
            secureTextEntry={!newPasswordVisible}
            onChangeText={onChange}
            error={errors.newPassword?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setNewPasswordVisible(!newPasswordVisible)}
              >
                <EyeIcon />
              </TouchableOpacity>
            }
            style={errors.newPassword ? styles.errorInput : {}}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Confirm Password"
            placeholder="XXXXXXXXXX"
            value={value}
            variant="filled"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                <EyeIcon />
              </TouchableOpacity>
            }
            style={errors.confirmPassword ? styles.errorInput : {}}
          />
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
  },
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
});
