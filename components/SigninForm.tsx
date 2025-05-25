import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { theme } from "@/constants/theme";
import {
  EnvelopGreyIcon,
  InactiveEnvelopIcon,
  EnvelopIcon,
  PasswordGreyIcon,
  PasswordBlackIcon,
  PasswordActiveIcon,
  EyeIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";

import { SigninFormValues } from "@/interfaces/types";
import CustomCheckbox from "./CustomCheckbox";
import JaraText from "./JaraText";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SigninFormProps {
  control: Control<SigninFormValues>;
  errors: any;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
}

export const SigninForm: React.FC<SigninFormProps> = ({
  control,
  errors,
  rememberMe,
  setRememberMe,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Your Email Address"
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

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Your Password"
            value={value}
            secureTextEntry={!passwordVisible}
            onChangeText={onChange}
            error={errors.password?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <EyeIcon />
              </TouchableOpacity>
            }
            style={errors.password ? styles.errorInput : {}}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.termsContainer}>
          <CustomCheckbox
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
          />
          <JaraText
            size={12}
            color={theme.colors.black_21}
            lineHeight={19.2}
            weight="500"
          >
            Remember Me
          </JaraText>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(auth)/forgotPasswordScreen")}
        >
          <JaraText
            size={12}
            weight="500"
            lineHeight={19.2}
            color={theme.colors.black_80}
            children="Forgot Password?"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
    gap: 16,
    padding: 16,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.foundation_green_light,
    borderRadius: 8,
    padding: 6,
    gap: 4,
  },
  termsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "500",
    color: theme.colors.foundation_pumpkin_normal,
  },
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
});
