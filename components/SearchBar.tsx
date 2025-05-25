import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import JaraText from "./JaraText";

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  rightIcon?: React.ReactNode;
  rightIconPress?: () => void;
  rightItem?: React.ReactNode;
  rightItemPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  rightIcon,
  rightIconPress,
  rightItem,
  rightItemPress,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={rightIconPress}
        style={styles.searchContainer}
      >
        <View style={{ flex: 0.9 }}>
          <JaraText>{value}</JaraText>
        </View>
        <View style={styles.input}>{rightIcon}</View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={rightItemPress}>
        {rightItem}
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  searchContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    width: "92%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    color: theme.colors.foundation_green_normal,
    marginRight: 8,
  },
});
