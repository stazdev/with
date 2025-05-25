import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PadLock from "@/assets/images/padlock.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "@/assets/icons";
import { CustomButton, JaraText } from "@/components";
import { router } from "expo-router";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import SuccessAlertModal from "@/components/SuccessAlertModal";

const ForgotPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    sendResetLink,
    isPending,
    email,
  } = useForgotPassword();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const onSubmit = () => {
    sendResetLink(email, {
      onSuccess: (response) => {
        setAlertMessage(response.message || "Reset link sent successfully!");
        setIsError(false);
        router.push({
          pathname: "/(auth)/phoneVerificationScreen",
          params: { email },
        });
      },
      onError: (error: any) => {
        setAlertMessage(error.message || "An unexpected error occurred.");
        setIsError(true);
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.header_container, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={{
            padding: 16,
            marginLeft: 10,
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <ChevronLeftIcon />
        </TouchableOpacity>
        <View
          style={{ alignItems: "center", marginTop: -50, marginBottom: 20 }}
        >
          <Image source={PadLock} />
        </View>
      </View>

      <JaraText
        children="Forgot Your Password?"
        size={28}
        weight="600"
        align="center"
        style={{ marginTop: 58, marginBottom: 16 }}
        color={theme.colors.foundation_green_normal}
      />
      <JaraText
        children="Don't worry, it happens.  Enter your email address and we'll send you an OTP to reset your password."
        size={16}
        weight="400"
        align="center"
        lineHeight={25.6}
        color={theme.colors.black_21}
        style={{ paddingHorizontal: 16, textTransform: "capitalize" }}
      />
      <ForgotPasswordForm control={control} errors={errors} />
      <CustomButton
        title={isPending ? "Sending..." : "Send Reset Link"}
        onPress={handleSubmit(onSubmit)}
        type="linearGradient"
        style={styles.submitButton}
        disabled={!isButtonActive || isPending}
      />

      <SuccessAlertModal
        visible={!!alertMessage}
        title={isError ? "Error" : "Success"}
        description={alertMessage || ""}
        buttonText="Close"
        onPressButton={() => setAlertMessage(null)}
        onClose={() => setAlertMessage(null)}
        isError={isError}
      />
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_dark,
  },
  header_container: {
    backgroundColor: theme.colors.foundation_green_normal,
  },
  submitButton: {
    width: "70%",
    alignSelf: "center",
  },
});
