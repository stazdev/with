import { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";

export const useVerification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && isModalVisible) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isModalVisible]);

  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length === 6) {
      setIsModalVisible(false);
      setIsSuccessModalVisible(true);
      console.log("Verification code:", otp);
    } else {
      setError("Please enter a 6-digit code.");
    }
  };

  const handleResendOtp = async () => {
    try {
      setTimeLeft(60);
      setError(null);
      console.log("OTP resent successfully", "success", "top");
    } catch (error) {
      console.log("Failed to resend OTP", "error", "top");
    }
  };

  return {
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
  };
};
