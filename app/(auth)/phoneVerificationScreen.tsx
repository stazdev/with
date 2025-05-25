import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhoneConcept from "@/assets/images/phone_concept.png";
import { CustomButton, JaraText, SuccessAlertModal } from "@/components";
import { router, useLocalSearchParams } from "expo-router";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { TouchableOpacity } from "react-native-gesture-handler";
import { forgetPassword } from "@/services/authService"; // Import ForgetPassword API

const PhoneVerificationScreen = () => {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams(); // Retrieve email from params
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]); // State for OTP
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Alert message state
  const [isError, setIsError] = useState<boolean>(false); // Error state
  const { mutate: verifyEmail, isPending } = useVerifyEmail(); // Hook for verifying email
  const [resendTimer, setResendTimer] = useState<number>(0); // Timer state
  const [isResending, setIsResending] = useState<boolean>(false); // Resend state

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handlePinChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  const onSubmit = () => {
    const otp = code.join(""); // Combine the code array into a single string
    verifyEmail(
      { email, code: otp },
      {
        onSuccess: (response) => {
          setAlertMessage(response.message || "Verification successful!");
          setIsError(false);
          router.replace("/(auth)/signinScreen"); // Navigate to reset password screen
        },
        onError: (error: any) => {
          setAlertMessage(
            error?.response?.data?.message || "An unexpected error occurred."
          );
          setIsError(true);
        },
      }
    );
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await forgetPassword(email);
      setAlertMessage(response.message || "OTP resent successfully!");
      setIsError(false);
      setResendTimer(30); // Start 30-second timer
    } catch (error: any) {
      setAlertMessage(
        error?.response?.data?.message || "Failed to resend OTP."
      );
      setIsError(true);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingTop: insets.top }}>
        <View style={{ alignItems: "center" }}>
          <Image source={PhoneConcept} />
        </View>
      </View>

      <JaraText
        children="Verify Reset Password OTP
"
        size={28}
        weight="600"
        align="center"
        style={{ marginTop: 40, marginBottom: 16 }}
        color={theme.colors.foundation_green_normal}
      />
      <JaraText
        children={`We have sent  password reset OTP to your email address.`}
        size={16}
        weight="400"
        align="center"
        lineHeight={25.6}
        color={theme.colors.black_21}
        style={{ paddingHorizontal: 16 }}
      />

      {/* PIN inputs */}
      <View style={styles.pinContainer}>
        <View style={styles.pinRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              cursorColor={theme.colors.foundation_pumpkin_normal}
              clearTextOnFocus={true}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          paddingRight: 16,
        }}
        onPress={handleResendOtp}
        disabled={resendTimer > 0 || isResending} // Disable button during timer or resend
      >
        <JaraText
          children={
            resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : isResending
              ? "Resending..."
              : "Resend OTP"
          }
          size={14}
          weight="500"
          color={
            resendTimer > 0 || isResending
              ? theme.colors.gery1
              : theme.colors.black_20
          }
        />
      </TouchableOpacity>
      <CustomButton
        title={isPending ? "Verifying..." : "Verify"}
        onPress={onSubmit}
        type="linearGradient"
        style={styles.submitButton}
        disabled={code.some((digit) => digit === "") || isPending} // Enable only if all inputs are filled
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

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_dark,
  },
  pinContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.m,
    marginTop: 40,
    marginHorizontal: 10,
  },
  pinInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.foundation_pumpkin_normal,
    width: 48,
    height: 48,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: theme.spacing.s,
    color: theme.colors.foundation_pumpkin_normal,
  },
  submitButton: {
    width: "70%",
    alignSelf: "center",
    marginTop: 40,
  },
});
