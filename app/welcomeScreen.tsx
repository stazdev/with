import { JaraText } from "@/components";
import CustomButton from "@/components/CustomButton";
import { theme } from "@/constants/theme";
import { Link, router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingBottom: inset.bottom }]}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.content}>
        <Image
          source={require("../assets/images/iphone.png")}
          style={styles.cardImage}
          resizeMode="contain"
        />

        {/* Overlay Content */}
        <View style={styles.overlayContent}>
          <JaraText
            size={30}
            weight="700"
            align="left"
            color={theme.colors.white}
            style={{ marginBottom: 12 }}
            type="Bold"
          >
            Let's Go Shopping
          </JaraText>
          <JaraText
            size={16}
            weight="500"
            align="left"
            color={theme.colors.foundation_dark_lighter}
            style={{ marginBottom: 47, letterSpacing: -0.32 }}
            lineHeight={25.6}
          >
            Ready to shop from our store?{"\n"}Continue as a guest, or sign up
            to save your favorites.
          </JaraText>

          {/* Create Account Button */}
          <CustomButton
            title="Create An Account"
            onPress={() => router.push("/(auth)/signupScreen")}
            // onPress={() => router.push("/(auth)/signupScreen")}
            type="linearGradient"
            style={styles.createAccountButton}
          />

          {/* Log In Button */}
          <CustomButton
            title="Log In To Your Account"
            onPress={() => router.push("/(auth)/signinScreen")}
            type="outline"
            style={styles.loginButton}
          />

          {/* Continue As Guest Link */}

          <CustomButton
            title="Continue As A Guest"
            onPress={() => router.replace("/(tabs)")}
            type="transparent"
            style={styles.guestButton}
          />
          {/* <Link href="/(tabs)">
            <Text>Continue As A Guest</Text>
          </Link> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  cardImage: {
    width: "80%",
    height: height * 0.9,
    position: "absolute",
    top: 0,
  },
  overlayContent: {
    backgroundColor: theme.colors.foundation_green_normal,
    borderTopRightRadius: 160,
    paddingHorizontal: 12,
    paddingVertical: 30,
    width: "100%",
    // height: 450,
    // marginTop: height * 0.6,
    marginBottom: -45,
    position: "absolute",
    bottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    lineHeight: 28.8,
    textAlign: "left",
  },
  sectionSubtitle: {
    color: theme.colors.foundation_dark_lighter,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 47,
    lineHeight: 25.6,
    textAlign: "left",
    letterSpacing: -0.32,
  },
  createAccountButton: {
    width: "100%",
    marginBottom: 24,
  },
  loginButton: {
    width: "100%",
    marginBottom: 24,
  },
  guestButton: {
    marginBottom: 36,
  },
});

export default WelcomeScreen;
