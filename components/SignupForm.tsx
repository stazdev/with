import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import { theme } from "@/constants/theme";
import {
  EnvelopGreyIcon,
  InactiveEnvelopIcon,
  EnvelopIcon,
  FlagIcon,
  PasswordGreyIcon,
  PasswordBlackIcon,
  PasswordActiveIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";
import JaraText from "./JaraText";
import CustomCheckbox from "./CustomCheckbox";
import { Link } from "expo-router";
import { SignupFormValues } from "@/interfaces/types";

interface SignupFormProps {
  control: Control<SignupFormValues>;
  errors: any;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  setEmail: (email: string) => void; // Add setEmail prop
}

export const SignupForm: React.FC<SignupFormProps> = ({
  control,
  errors,
  rememberMe,
  setRememberMe,
  setEmail,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Your Email Address"
            value={value}
            onChangeText={(text) => {
              onChange(text);
              setEmail(text);
            }}
            error={errors.email?.message}
            icon={<EnvelopGreyIcon />}
            onFocusIcon={<InactiveEnvelopIcon />}
            validatedIcon={<EnvelopIcon />}
            style={errors.email ? styles.errorInput : {}}
          />
        )}
      />

      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCode}>
          <FlagIcon />
          <JaraText size={14} weight="500" color={theme.colors.black}>
            +234
          </JaraText>
        </View>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <JaraInput
              placeholder="9029717250"
              value={value ? value.replace(/^234/, "") : ""}
              onChangeText={(text) => {
                let cleaned = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                if (cleaned.startsWith("0")) {
                  cleaned = cleaned.substring(1); // Remove leading '0'
                }
                onChange(`234${cleaned}`); // Prepend country code
              }}
              error={errors.phone?.message}
              style={StyleSheet.flatten([
                { flex: 1 },
                errors.phone ? styles.errorInput : {},
              ])}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Create A Unique Password"
            value={value}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            onChangeText={onChange}
            error={errors.password?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off" : "eye"} // Toggle icon
                size={24}
                color={theme.colors.black}
                onPress={() => setPasswordVisible(!isPasswordVisible)} // Toggle state
              />
            }
            style={errors.password ? styles.errorInput : {}}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            placeholder="Confirm Your Password"
            value={value}
            secureTextEntry={!isConfirmPasswordVisible} // Toggle visibility
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
            icon={<PasswordGreyIcon />}
            onFocusIcon={<PasswordBlackIcon />}
            validatedIcon={<PasswordActiveIcon />}
            rightIcon={
              <MaterialCommunityIcons
                name={isConfirmPasswordVisible ? "eye-off" : "eye"} // Toggle icon
                size={24}
                color={theme.colors.black}
                onPress={() =>
                  setConfirmPasswordVisible(!isConfirmPasswordVisible)
                } // Toggle state
              />
            }
            style={errors.confirmPassword ? styles.errorInput : {}}
          />
        )}
      />

      <View style={styles.termsContainer}>
        <CustomCheckbox
          value={rememberMe}
          onValueChange={() => setRememberMe(!rememberMe)}
        />
        <JaraText size={12} weight="500">
          By clicking this, you agree to Withjara's{" "}
          <Link href={"/(profile)/termsAndConditions"} style={styles.link}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/(profile)/privacyPolicy"} style={styles.link}>
            Privacy Policy
          </Link>
          .
        </JaraText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
    gap: 24,
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
