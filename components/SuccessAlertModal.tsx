import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { theme } from "@/constants/theme"; // Assuming you have a theme file for consistent styling
import CustomButton from "./CustomButton";
import { SuccessCheck } from "@/assets/icons";
import JaraText from "./JaraText";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons for error icon

interface SuccessAlertModalProps {
  visible: boolean;
  title: string;
  description: string;
  buttonText: string;
  onPressButton: () => void;
  onClose: () => void;
  isError?: boolean; // Add isError prop to differentiate between success and error
}

const SuccessAlertModal: React.FC<SuccessAlertModalProps> = ({
  visible,
  title,
  description,
  buttonText,
  onPressButton,
  onClose,
  isError = false, // Default to false for success
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* TouchableOpacity to detect tap on backdrop */}
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Blurred background */}
        <BlurView intensity={100} style={styles.absolute} tint="dark" />

        {/* Prevent clicks from passing through the modal content */}
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            {isError ? (
              <MaterialCommunityIcons
                name="alert-circle"
                size={120}
                color={theme.colors.primary} // Error color
              />
            ) : (
              <View style={styles.checkIcon}>
                <SuccessCheck />
              </View>
            )}
          </View>

          {/* Title */}
          <JaraText
            size={20}
            weight="700"
            color={
              isError
                ? theme.colors.foundation_pumpkin_normal // Error color
                : theme.colors.foundation_green_normal // Success color
            }
            style={styles.title}
            align="center"
          >
            {title}
          </JaraText>

          {/* Description */}
          <JaraText
            size={16}
            weight="400"
            lineHeight={22.4}
            color={theme.colors.black_21}
            style={styles.description}
            align="center"
          >
            {description}
          </JaraText>

          {/* Button */}
          <CustomButton
            type="linearGradient"
            title={buttonText}
            onPress={onPressButton}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 32,
    paddingBottom: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  checkIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.background_positive_default,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 12,
    marginTop: 20,
  },
  description: {
    marginBottom: 43,
    textAlign: "center",
  },
});

export default SuccessAlertModal;
