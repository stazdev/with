import { theme } from "@/constants/theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JaraText from "./JaraText";

interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <>
      {title && (
        <JaraText
          size={20}
          weight="600"
          color={theme.colors.black}
          style={{ letterSpacing: 0.2, paddingLeft: 20, marginBottom: 16 }}
        >
          {title}
        </JaraText>
      )}
      <View style={styles.sectionCard}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "#FFF", // White card background
    marginHorizontal: 20,
    marginBottom: 28,
    // marginTop: 16,
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
    shadowColor: theme.colors.black_10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10, // For Android shadow
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 20,
  },
});

export default ProfileSection;
