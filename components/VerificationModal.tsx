import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { JaraModal, JaraText, CustomButton } from "@/components";
import { WhatsApp, MailBox, Arrow2, Arrow1 } from "@/assets/icons";
import { theme } from "@/constants/theme";
import { formatTime } from "@/utils/formatter";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { VerifyEmailRequest } from "@/interfaces/auth";

interface VerificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  email: string; // Ensure email prop is present
  onSuccess: () => void; // Add onSuccess prop
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  isVisible,
  onClose,
  email,
  onSuccess,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>(Array(5).fill(null));
  const { mutateAsync: verifyEmailMutate, isPending, error } = useVerifyEmail();

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

  const handleVerify = async () => {
    try {
      const concatenatedCode = code.join("");
      if (!concatenatedCode) {
        alert("Please enter the verification code.");
        return;
      }

      const payload: VerifyEmailRequest = {
        email, // Use email for verification
        code: concatenatedCode,
      };

      await verifyEmailMutate(payload);
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to verify email.");
    }
  };

  return (
    <JaraModal
      isVisible={isVisible}
      onClose={onClose}
      initialSnapPoint="60%"
      maxSnapPoint="70%"
    >
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <MailBox />
      </View>

      {/* Title */}
      <JaraText
        size={28}
        weight="700"
        color={theme.colors.green}
        style={{ marginTop: 24, marginBottom: 16, textAlign: "center" }}
      >
        Verify Your Account
      </JaraText>

      {/* Subtitle */}
      <JaraText
        children={
          "We've sent a verification link to your email address. Please check your inbox and enter it below to continue your registration."
        }
        size={16}
        weight="400"
        color={theme.colors.black_21}
        style={{ textAlign: "center", marginBottom: 36 }}
        lineHeight={25.6}
      />

      {/* PIN Inputs */}
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
              accessible={true}
              accessibilityLabel={`PIN digit ${index + 1}`}
            />
          ))}
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <JaraText
          size={14}
          weight="500"
          color={theme.colors.foundation_pumpkin_normal}
          style={{ textAlign: "center", marginTop: 16 }}
        >
          {error.message || "An error occurred."}
        </JaraText>
      )}

      {/* Verify Button */}
      <CustomButton
        title="Verify"
        onPress={handleVerify}
        type="linearGradient"
        style={styles.verifyButton}
        disabled={isPending}
      />
    </JaraModal>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: theme.colors.foundation_scarlet_light,
    borderRadius: 160,
    paddingTop: 23,
    paddingBottom: 22.085,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: theme.colors.foundation_scarlet_light_hover,
  },
  pinContainer: {
    alignItems: "center",
    alignSelf: "center",
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.m,
    marginTop: 30,
  },
  pinInput: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.foundation_pumpkin_normal,
    width: 48,
    height: 48,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    marginHorizontal: theme.spacing.s,
    color: theme.colors.foundation_pumpkin_normal,
  },
  verifyButton: {
    width: "70%",
    alignSelf: "center",
    marginVertical: 48,
  },
});

export default VerificationModal;
