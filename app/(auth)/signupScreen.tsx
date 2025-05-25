import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "@/constants/theme";
import { useSignupForm } from "@/hooks/useSignupForm";
import { useVerification } from "@/hooks/useVerification";
import {
  AuthHeader,
  CustomButton,
  JaraText,
  SocialSignup,
  VerificationModal,
} from "@/components";
import { SignupForm } from "@/components/SignupForm";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import SuccessModal from "@/components/SuccessModal";
import { useSignUp } from "@/hooks/useSignUp";
import { SignupFormValues } from "@/interfaces/types";
import { Link } from "expo-router";
import SuccessAlertModal from "@/components/SuccessAlertModal"; // Import SuccessAlertModal

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Add email state
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
  const [isError, setIsError] = useState<boolean>(false); // State to track if the alert is an error

  const {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    rememberMe,
    setRememberMe,
  } = useSignupForm();

  const {
    isModalVisible,
    setIsModalVisible,
    isSuccessModalVisible,
    setIsSuccessModalVisible,
    code,
    setCode,
    timeLeft,
    error,
    inputRefs,
    handleVerify,
    handleResendOtp,
  } = useVerification();

  const { mutate: signUp, isPending } = useSignUp(
    (message) => {
      setAlertMessage(message); // Set success message
      setIsError(false); // Mark as success
      setIsModalVisible(true); // Show verification modal
    },
    (error) => {
      setAlertMessage(error); // Set error message
      setIsError(true); // Mark as error
    }
  );

  const onSubmit = (data: SignupFormValues) => {
    signUp(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />

      <AuthHeader
        currentStep={1}
        totalSteps={3}
        title="Join Withjara Store"
        description={"Create an account to shop at  anytime, any store."}
      />

      <SignupForm
        control={control}
        errors={errors}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        setEmail={setEmail}
      />

      <CustomButton
        title={
          isPending ? (
            <ActivityIndicator size={"small"} color={theme.colors.white} />
          ) : (
            "Verify Email & Continue"
          )
        }
        onPress={handleSubmit(onSubmit)}
        type="linearGradient"
        style={styles.submitButton}
        disabled={!isButtonActive || isPending}
      />

      <SocialSignup />

      <View style={styles.loginContainer}>
        <JaraText align="center" color={theme.colors.gery1}>
          I already Have an Account
        </JaraText>
        <MaskedView
          maskElement={
            <Text style={styles.loginText}>
              <Link href="/(auth)/signupScreen">Login</Link>
            </Text>
          }
        >
          <LinearGradient
            colors={["#FF7508", "#1A2610"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={[styles.loginText, { opacity: 0 }]}>
              <Link href="/(auth)/signinScreen">Login</Link>
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <VerificationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        code={code}
        setCode={setCode}
        timeLeft={timeLeft}
        handleVerify={handleVerify}
        handleResendOtp={handleResendOtp}
        error={error}
        inputRefs={inputRefs}
        email={email}
        onSuccess={() => setIsSuccessModalVisible(true)}
      />

      <SuccessModal
        isVisible={isSuccessModalVisible}
        onClose={() => setIsSuccessModalVisible(false)}
      />

      {/* Display alert message in SuccessAlertModal */}
      <SuccessAlertModal
        visible={!!alertMessage}
        title={isError ? "Signup Failed" : "Signup Successful"}
        description={alertMessage || ""}
        buttonText={isError ? "Try Again" : "Continue"}
        onPressButton={() => setAlertMessage(null)}
        onClose={() => setAlertMessage(null)}
        isError={isError}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_dark,
  },
  submitButton: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 32,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  gradient: {
    flex: 1,
  },
});

export default SignupScreen;
