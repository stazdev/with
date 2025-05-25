import React from "react";
import { View, StyleSheet } from "react-native";
import { JaraModal, JaraText, CustomButton } from "@/components";
import { MailBox } from "@/assets/icons";
import { theme } from "@/constants/theme";
import { router } from "expo-router";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose }) => {
  return (
    <JaraModal isVisible={isVisible} onClose={onClose} maxSnapPoint="60%">
      <View style={styles.iconContainer}>
        <MailBox />
      </View>
      <JaraText
        size={28}
        weight="700"
        color={theme.colors.background_positive_default}
        style={styles.title}
      >
        Your account is verified
      </JaraText>
      <JaraText
        size={16}
        weight="400"
        color={theme.colors.black_21}
        style={styles.description}
      >
        We've confirmed your email. Continue your registration by completing the
        next 2 steps and enjoying the shopping experience.
      </JaraText>
      <CustomButton
        title="Continue Registration"
        onPress={() => router.push("/(auth)/accountInformationScreen")}
        type="linearGradient"
        style={styles.button}
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
  title: { textAlign: "center", marginTop: 24, marginBottom: 16 },
  description: { textAlign: "center" },
  button: { width: "70%", alignSelf: "center", marginVertical: 48 },
});

export default SuccessModal;
