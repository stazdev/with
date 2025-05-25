import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronRightActiveIcon } from "@/assets/icons";
import { theme } from "@/constants/theme";
import JaraText from "./JaraText";

interface ProfileOptionProps {
  title: string;
  onPress?: () => void;
  badge?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  padding?: boolean;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  title,
  onPress,
  badge,
  leftIcon,
  rightIcon,
  padding = true,
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionContainer, padding && { paddingVertical: 15 }]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {leftIcon && (
        <View
          style={{
            width: 20,
            height: 20,
            padding: 3,
            borderRadius: 20,
            backgroundColor: theme.colors.foundation_pumpkin_light,
            marginRight: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {leftIcon}
        </View>
      )}
      <JaraText
        size={16}
        weight="400"
        color={theme.colors.black_80}
        style={{ letterSpacing: 0.16, flex: 1, paddingLeft: 8 }}
      >
        {title}
      </JaraText>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <View>{rightIcon ? rightIcon : <ChevronRightActiveIcon />}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.foundation_pumpkin_light,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  badge: {
    backgroundColor: theme.colors.green,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginRight: 18,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
  },
});

export default ProfileOption;
