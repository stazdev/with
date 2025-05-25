import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";
import { scaleFont } from "../utils/scale";

interface JaraTextProps extends TextProps {
  size?: number; // Font size
  color?: string; // Text color
  weight?: "normal" | "bold" | "400" | "500" | "600" | "700"; // Font weight
  align?: "left" | "center" | "right"; // Text alignment
  lineHeight?: number; // Line height
  family?: "Lato" | "Aquire"; // Font family
  type?: "Bold" | "Light" | "Regular";
  style?: TextStyle | TextStyle[]; // Additional styles
  children: React.ReactNode;
}

const JaraText: React.FC<JaraTextProps> = ({
  size = 16,
  color = "#000",
  weight = "normal",
  align = "left",
  lineHeight,
  family = "Lato",
  type = "Regular",
  style,
  children,
  ...props
}) => {
  const computedStyle = StyleSheet.flatten([
    {
      fontSize: scaleFont(size),
      color,
      fontWeight: weight,
      textAlign: align,
      lineHeight: lineHeight ? scaleFont(lineHeight) : undefined,
      fontFamily: `${family}${type}`,
    },
    style, // Add custom style if any
  ]);

  return (
    <Text style={computedStyle} {...props}>
      {children}
    </Text>
  );
};

export default JaraText;
