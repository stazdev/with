import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, JaraText, SocialSignup } from "@/components";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CyberCart from "@/assets/images/cyber_cart.png";
import { useSigninForm } from "@/hooks/useSigninForm";
import { SigninForm } from "@/components/SigninForm";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useSignin } from "@/hooks/useSignin";
import { SigninFormValues } from "@/interfaces/types";
import SuccessAlertModal from "@/components/SuccessAlertModal";

const SigninScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    errors,
    isButtonActive,
    rememberMe,
    setRememberMe,
  } = useSigninForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { mutate: signIn, isPending, isError, error } = useSignin();

  const onSubmit = (data: SigninFormValues) => {
    signIn(data, {
      onSuccess: () => {
        router.replace("/(tabs)");
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          setModalMessage("Incorrect email or password. Please try again.");
          setModalVisible(true);
        } else {
          console.error("Login failed", error);
        }
      },
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={[styles.header_container, { paddingTop: insets.top }]}>
          <View style={styles.content}>
            <View>
              <View>
                <JaraText
                  size={40}
                  weight="700"
                  align="left"
                  color={theme.colors.white}
                  style={styles.title}
                  lineHeight={48}
                >
                  Welcome Back
                </JaraText>
                <JaraText
                  size={14}
                  color={theme.colors.foundation_white_active}
                  align="left"
                  weight="400"
                  lineHeight={22.4}
                  style={{ marginBottom: 36 }}
                >
                  SignIn to your withJara account
                </JaraText>
              </View>
            </View>
            <View style={{ marginLeft: -55 }}>
              <Image source={CyberCart} />
            </View>
          </View>
        </View>
        <SigninForm
          control={control}
          errors={errors}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          onSubmit={handleSubmit(onSubmit)}
        />
        <CustomButton
          title={
            isPending ? (
              <ActivityIndicator size={"small"} color={theme.colors.white} />
            ) : (
              "Sign In"
            )
          }
          onPress={handleSubmit(onSubmit)}
          type="linearGradient"
          style={styles.submitButton}
          disabled={isPending || !isButtonActive}
        />

        <SocialSignup />
        <View style={styles.loginContainer}>
          <JaraText align="center" color={theme.colors.gery1}>
            Don't Have an Account
          </JaraText>
          <MaskedView
            maskElement={
              <Text style={styles.loginText}>
                <Link href="/(auth)/signupScreen">Sign Up</Link>
              </Text>
            }
          >
            <LinearGradient
              colors={["#FF7508", "#1A2610"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={[styles.loginText, { opacity: 0 }]}>
                <Link href="/(auth)/signupScreen">Sign Up</Link>
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
      </ScrollView>
      <SuccessAlertModal
        visible={isModalVisible}
        title="Login Failed"
        description={modalMessage}
        buttonText="Try Again"
        onPressButton={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_dark,
  },
  header_container: {
    backgroundColor: theme.colors.foundation_green_normal,
    paddingLeft: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
    marginTop: 32,
  },
  submitButton: {
    width: "70%",
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 30,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 40,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  gradient: {
    flex: 1,
  },
});
