import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { theme } from "@/constants/theme";

interface SectionTitleProps {
  title: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  rightText?: string; // Optional right-side text
  rightTextStyle?: TextStyle;
  onRightPress?: (event: GestureResponderEvent) => void; // Press handler for the right text
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  style,
  titleStyle,
  rightText,
  rightTextStyle,
  onRightPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {rightText && (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
          <Text style={[styles.rightText, rightTextStyle]}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.foundation_green_normal,
  },
  rightText: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.foundation_pumpkin_normal,
  },
});
