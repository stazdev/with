import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams
import { theme } from "@/constants/theme";
import {
  AuthHeader,
  CustomButton,
  JaraText,
  SocialSignup,
  SuccessAlertModal,
} from "@/components";
import { AddressInfoForm } from "@/components/AddressInfoForm";
import { useAddressInfoForm } from "@/hooks/useAddressInfoForm";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useCompleteSignup } from "@/hooks/useCompleteSignup";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";

const AddressInformationScreen = () => {
  const { control, errors, handleSubmit, isButtonActive } =
    useAddressInfoForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("You're All Set");
  const [modalDescription, setModalDescription] = useState(
    "Thank you for joining. You can now start exploring our amazing products."
  );
  const [isErrorModal, setIsErrorModal] = useState(false);

  const { formData } = useLocalSearchParams(); // Get formData from params
  const parsedFormData = JSON.parse(formData); // Parse formData
  console.log(parsedFormData);
  const {
    mutate: completeSignup,
    isPending,
    isError,
    error,
  } = useCompleteSignup();
  const email = useAuthStore((state) => state.email);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleButtonPress = () => {
    setModalVisible(false);
    if (!isErrorModal) {
      router.replace("/(tabs)");
    }
  };

  const onSubmit = (data: { shippingAddress?: any; billingAddress?: any }) => {
    if (!email) {
      console.error(
        "Email not found in auth store during completeSignup. This indicates a flow error."
      );
      setModalTitle("Critical Error");
      setModalDescription(
        "Your email was not found. Please try signing up again."
      );
      setIsErrorModal(true);
      setModalVisible(true);
      return;
    }

    completeSignup(
      {
        email: email, // Use email from authStore
        fullName: parsedFormData.fullName,
        dateOfBirth: parsedFormData.dateOfBirth,
        gender: parsedFormData.gender,
        address: {
          shippingAddress: data.shippingAddress,
          billingAddress: data.billingAddress,
        },
      },
      {
        onSuccess: () => {
          setModalTitle("You're All Set");
          setModalDescription(
            "Thank you for joining. You can now start exploring our amazing products."
          );
          setIsErrorModal(false);
          setModalVisible(true);
        },
        onError: (error: any) => {
          setModalTitle("Signup Failed");
          setModalDescription(
            error.message || "An unexpected error occurred."
          );
          setIsErrorModal(true);
          setModalVisible(true);
          // console.error("Signup failed:", error);
        },
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />

      <AuthHeader
        currentStep={3}
        totalSteps={3}
        title="Address Information"
        description={"Where should we send your goodies?"}
      />
      <AddressInfoForm control={control} errors={errors} />
      <CustomButton
        title="Create Account"
        onPress={handleSubmit(onSubmit)}
        type="linearGradient"
        style={styles.submitButton}
        disabled={!isButtonActive}
      />
      <SocialSignup />
      <View style={styles.loginContainer}>
        <JaraText align="center" color={theme.colors.gery1}>
          I Already Have an Address
        </JaraText>
        <MaskedView maskElement={<Text style={styles.loginText}>Login</Text>}>
          <LinearGradient
            colors={["#FF7508", "#1A2610"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={{ opacity: 0 }}>Login</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <SuccessAlertModal
        visible={isModalVisible}
        title={modalTitle}
        description={modalDescription}
        buttonText={isErrorModal ? "Try Again" : "Start Shopping"}
        onPressButton={handleButtonPress}
        onClose={handleModalClose}
        isError={isErrorModal}
      />
    </ScrollView>
  );
};

export default AddressInformationScreen;

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
});
