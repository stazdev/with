import React from "react";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../constants/theme";
import JaraText from "./JaraText";
import { DiagonalArrowUp } from "@/assets/icons";

type CustomButtonProps = {
  title: string | React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  type?: "linearGradient" | "outline" | "transparent";
  style?: ViewStyle;
  disabled?: boolean;
  titleStyle?: TextStyle;
  rightIcon?: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = "transparent",
  style,
  disabled = false,
  titleStyle,
  rightIcon,
}) => {
  const ButtonContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <JaraText
        style={[
          styles.buttonText,
          type === "outline" ? styles.primaryText : styles.whiteText,
          titleStyle,
        ]}
      >
        {title}
      </JaraText>
      {rightIcon && rightIcon}
    </View>
  );

  const GradientBackground = () => (
    <LinearGradient
      colors={["#FF2803", "#FF7508"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        type === "linearGradient" && styles.linearGradientContainer,
        type === "outline" && styles.outlineButton,
        type === "transparent" && styles.transparentBackground,
        pressed && !disabled && styles.pressedButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {type === "linearGradient" && <GradientBackground />}
      <ButtonContent />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 10,
    shadowColor: theme.colors.black_25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  linearGradientContainer: {},
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 50,
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  whiteText: {
    color: "#fff",
  },
  primaryText: {
    color: theme.colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.8,
  },
});

export default CustomButton;
