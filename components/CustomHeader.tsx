import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "@/constants/theme";
import JaraText from "./JaraText";

interface CustomHeaderProps {
  title?: string;
  titleStyle?: TextStyle;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  titleStyle,
  leftComponent,
  rightComponent,
  centerComponent,
  onLeftPress,
  onRightPress,
  containerStyle,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Component */}
      {leftComponent ? (
        <TouchableOpacity
          style={[styles.sideComponent, containerStyle]}
          onPress={onLeftPress}
          activeOpacity={0.7}
        >
          {leftComponent}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}

      {/* Title */}
      {title && (
        <JaraText
          size={20}
          weight="700"
          type="Bold"
          family="Lato"
          lineHeight={30}
          style={[{ letterSpacing: 0.4 }, titleStyle]}
        >
          {title}
        </JaraText>
      )}
      {centerComponent}
      {/* Right Component */}
      <TouchableOpacity
        style={[styles.sideComponent, containerStyle]}
        onPress={onRightPress}
        activeOpacity={0.7}
      >
        {rightComponent}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // backgroundColor: theme.colors.foundation_white_light_hover,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.black_80,
  },
  sideComponent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: 4,
    borderRadius: 100,
  },
});

export default CustomHeader;
