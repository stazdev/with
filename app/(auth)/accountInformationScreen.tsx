import { ScrollView, StatusBar, StyleSheet, View, Text } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { AuthHeader, CustomButton, JaraText, SocialSignup } from "@/components";
import { AccountInfoForm } from "@/components/AccountInfoForm";
import { useAccountInfoForm } from "@/hooks/useAccountInfoForm";
import { router } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const accountInformationScreen = () => {
  const { control, errors, handleSubmit, getValues, isButtonActive } =
    useAccountInfoForm();

  const onSubmit = () => {
    // Get form values
    const formData = getValues();
    // Pass data to the next screen as params
    router.push({
      pathname: "/(auth)/addressInformationScreen",
      params: { formData: JSON.stringify(formData) },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" />
      <AuthHeader
        currentStep={2}
        totalSteps={3}
        title="Account Information"
        description={"Tell us a little about you"}
      />
      <AccountInfoForm control={control} errors={errors} />
      <CustomButton
        title="Next"
        onPress={handleSubmit(onSubmit)}
        type="linearGradient"
        style={styles.submitButton}
        disabled={!isButtonActive}
      />
      <SocialSignup />
      <View style={styles.loginContainer}>
        <JaraText align="center" color={theme.colors.gery1}>
          I Already Have an Account
        </JaraText>
        <MaskedView maskElement={<Text style={styles.loginText}>Login</Text>}>
          <LinearGradient
            colors={["#FF7508", "#1A2610"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={{ opacity: 0 }}>Login</Text>
          </LinearGradient>
        </MaskedView>
      </View>
    </ScrollView>
  );
};

export default accountInformationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_dark,
  },
  submitButton: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 32,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
