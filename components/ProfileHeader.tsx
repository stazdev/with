import React from "react";
import { View, StyleSheet } from "react-native";
import JaraText from "./JaraText";
import { theme } from "@/constants/theme";

interface ProfileHeaderProps {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  email,
  phoneNumber,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.infoContainer}>
          <JaraText
            color={theme.colors.foundation_pumpkin_normal}
            size={20}
            weight="600"
            style={{ letterSpacing: 0.6, marginBottom: 8 }}
          >
            {fullName || "Full Name"}
          </JaraText>
          <JaraText
            color={theme.colors.black_70}
            size={16}
            weight="500"
            style={{ letterSpacing: 0.16, marginBottom: 8 }}
          >
            {email || "email@example.com"}
          </JaraText>
          <JaraText
            color={theme.colors.black_70}
            size={16}
            weight="500"
            style={{ letterSpacing: 0.16 }}
          >
            {phoneNumber || "+123-456-7890"}
          </JaraText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 24,
    marginBottom: 24,
    borderBottomColor: theme.colors.black_20,
    borderBottomWidth: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
});

export default ProfileHeader;
