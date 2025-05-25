import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Use icons for checkmark
import { theme } from "../constants/theme";

type CustomCheckboxProps = {
  value: boolean;
  onValueChange: () => void;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && (
          <MaterialIcons name="check" size={16} color={theme.colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.black_5,
    borderRadius: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
});

export default CustomCheckbox;
