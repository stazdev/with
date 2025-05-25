import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import React from "react";
import { theme } from "@/constants/theme";

interface SocialButtonProps {
  imageSource: React.ReactNode; // Replace 'any' with a more specific type if needed
  buttonText: string;
  onPress: () => void; // Add onPress prop
}

const SocialButton: React.FC<SocialButtonProps> = ({
  imageSource,
  buttonText,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.icon}>{imageSource}</View>
      <Text style={styles.text}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.black_20,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  } as ViewStyle,
  icon: {
    marginRight: 8,
  },
  text: {
    textAlign: "center",
    flex: 0,
  } as TextStyle,
});

export default SocialButton;
