import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
  TextStyle,
} from "react-native";
import { theme } from "@/constants/theme";
import { ChevronDownIcon, ChevronRightGreyIcon } from "@/assets/icons";
import JaraText from "./JaraText";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

if (Platform.OS === "android") {
  // Enable LayoutAnimation for Android
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  leftIcon,
  rightIcon,
  titleStyle,
  containerStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.container]}>
      {/* Header Section */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.header, containerStyle]}
        onPress={toggleSection}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {leftIcon}
          <JaraText
            size={20}
            weight="700"
            color={theme.colors.foundation_green_normal}
            style={titleStyle}
          >
            {title}
          </JaraText>
          {rightIcon}
        </View>
        {isExpanded ? <ChevronDownIcon /> : <ChevronRightGreyIcon />}
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export default CollapsibleSection;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
    borderRadius: 8,

    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 0.7,
    borderBottomColor: theme.colors.foundation_green_light,
  },

  content: {
    // padding: 16,
  },
});
