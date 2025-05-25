import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/constants/theme";
import JaraText from "./JaraText";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onFocusIcon?: React.ReactNode;
  validatedIcon?: React.ReactNode;
  label?: string;
  variant?: "outlined" | "filled";
  editable?: boolean;
}

const JaraInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  style,
  inputStyle,
  icon,
  rightIcon,
  onPress,
  onFocusIcon,
  validatedIcon,
  label,
  variant = "outlined",
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputBorderStyle = error
    ? { borderColor: theme.colors.foundation_pumpkin_normal }
    : variant === "outlined"
    ? { borderColor: "rgba(28, 28, 28, 0.20)" }
    : { backgroundColor: theme.colors.white };

  const displayIcon = isFocused
    ? onFocusIcon
    : value && !error
    ? validatedIcon
    : icon;

  return (
    <>
      {label && (
        <JaraText
          size={16}
          weight="500"
          color={theme.colors.black}
          // style={{ marginBottom: 12 }}
        >
          {label}
        </JaraText>
      )}
      <View
        style={[
          styles.container,
          inputBorderStyle,
          variant === "filled" && styles.filledContainer,
          style,
        ]}
      >
        <View style={styles.inputContainer}>
          {displayIcon && (
            <View style={styles.iconContainer}>{displayIcon}</View>
          )}
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={"rgba(28, 28, 28, 0.60)"}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            cursorColor={theme.colors.primary}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            editable={editable}
          />
          {rightIcon && (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
  },
  filledContainer: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black_10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    borderColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    paddingRight: 8,
  },
  input: {
    flex: 1,
    fontWeight: "400",
    fontSize: 14,
    paddingVertical: 9,
    height: 48,
  },
});

export default JaraInput;
