import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import JaraText from "./JaraText";
import { theme } from "@/constants/theme";
import { truncateText } from "@/utils/formatter";

interface VerticalStoreProps {
  image: any;
  storeName: string;
  onPress: () => void;
}

const VerticalStore: React.FC<VerticalStoreProps> = ({
  image,
  storeName,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} style={styles.storeImage} />
      <JaraText
        size={12}
        weight="700"
        align="center"
        color={theme.colors.black_80}
        style={{ lineHeight: 20.4, letterSpacing: 0.2 }}
      >
        {truncateText(storeName)}
      </JaraText>
    </TouchableOpacity>
  );
};

export default VerticalStore;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: 36, // To make the image rounded
    marginBottom: 12,
    backgroundColor: theme.colors.foundation_white_active,
  },
  storeName: {
    fontSize: 14,
    fontWeight: "600",
  },
});
