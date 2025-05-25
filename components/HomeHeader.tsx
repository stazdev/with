import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { CartIcon } from "@/assets/icons";
import JaraText from "./JaraText";
import { theme } from "@/constants/theme";
import { router } from "expo-router";
import useProfileStore from "@/store/profileStore";

const HomeHeader = () => {
  const { profileData } = useProfileStore();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.leftContent}>
        <Image
          source={{
            uri: profileData?.profileImage || "https://via.placeholder.com/40",
          }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <JaraText style={styles.greeting} size={24} weight="700">
            Hello There 👋
          </JaraText>
          <JaraText
            style={styles.subtitle}
            size={14}
            weight="400"
            color={theme.colors.grey_80}
          >
            What are you shopping from withjara today
          </JaraText>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => router.push("/cartScreen")}
      >
        <CartIcon />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    gap: 4,
  },
  greeting: {
    fontStyle: "italic",
    textTransform: "capitalize",
  },
  subtitle: {
    textTransform: "capitalize",
    lineHeight: 16.8,
  },
  cartButton: {
    padding: 10,
  },
});
