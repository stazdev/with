import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "@/constants/theme";

interface SearchProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  leftIcon?: React.ReactNode;
  leftIconPress?: () => void;
  rightItem?: React.ReactNode;
  rightItemPress?: () => void;
  leftItem?: React.ReactNode;
  leftItemPress?: () => void;
  variant?: "filled" | "outlined" | "filledOutlined"; // New variant added
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search",
  onChangeText,
  value,
  leftIcon,
  rightItem,
  rightItemPress,
  leftItem,
  leftItemPress,
  variant = "filled", // Default to filled variant
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      {leftItem && (
        <TouchableOpacity onPress={leftItemPress}>{leftItem}</TouchableOpacity>
      )}
      <View
        style={[
          styles.searchContainer,
          variant === "outlined" && styles.outlinedContainer, // Apply outlined style if selected
          variant === "filledOutlined" && styles.filledOutlinedContainer, // Apply filledOutlined style if selected
        ]}
      >
        {leftIcon}
        <TextInput
          style={[
            styles.input,
            variant === "outlined" && styles.outlinedInput, // Adjust input text style for outlined variant
            variant === "filledOutlined" && styles.filledOutlinedInput, // Adjust input text style for filledOutlined variant
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey_80}
          onChangeText={onChangeText}
          value={value}
          cursorColor={theme.colors.foundation_pumpkin_normal}
          {...textInputProps}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={rightItemPress}
        style={{ padding: 10, paddingLeft: 0 }}
      >
        {rightItem}
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  searchContainer: {
    backgroundColor: theme.colors.white, // Filled style background
    borderRadius: 16,
    flex: 0.9,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 8,
  },
  outlinedContainer: {
    backgroundColor: "transparent", // No background for outlined
    borderWidth: 1,
    borderColor: theme.colors.black_10,
  },
  filledOutlinedContainer: {
    backgroundColor: theme.colors.white, // Filled style background
    borderWidth: 1,
    borderColor: theme.colors.black_10, // Outlined border
    borderRadius: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.foundation_green_normal,
    marginRight: 8,
  },
  outlinedInput: {
    color: theme.colors.black,
  },
  filledOutlinedInput: {
    color: theme.colors.foundation_green_normal, // Same as filled
  },
});
