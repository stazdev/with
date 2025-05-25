import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { NewPasswordForm } from "@/components/NewPasswordForm";
import { useNewPasswordForm } from "@/hooks/useNewPasswordForm";
import { ChevronGreyLeftIcon } from "@/assets/icons";
import {
  CustomButton,
  CustomHeader,
  JaraText,
  SuccessAlertModal,
} from "@/components";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useChangePassword } from "@/hooks/useFetchAccount";

const changePassword = () => {
  const insets = useSafeAreaInsets();
  const { control, handleSubmit, errors, isButtonActive } =
    useNewPasswordForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data) => {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    changePassword(payload, {
      onSuccess: (response) => {
        setModalMessage(response.message);
        setModalVisible(true);
      },
      onError: (error) => {
        setModalMessage(error.message);
        setModalVisible(true);
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Create new password"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        rightComponent={<View style={styles.headerRightPlaceholder} />}
        containerStyle={styles.headerContainer}
      />
      <JaraText
        align="center"
        color={theme.colors.black_21}
        size={14}
        weight="500"
        style={styles.headerDescription}
        lineHeight={23.8}
      >
        Protect your information. Create a new password for your account.
      </JaraText>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NewPasswordForm control={control} errors={errors} />
        <View style={{ paddingHorizontal: 20 }}>
          <CustomButton
            title={
              isPending ? (
                <ActivityIndicator size={"small"} color={theme.colors.white} />
              ) : (
                "Save Password"
              )
            }
            onPress={handleSubmit(onSubmit)}
            type="linearGradient"
            style={styles.submitButton}
            disabled={!isButtonActive || isPending}
          />
        </View>
      </ScrollView>
      <SuccessAlertModal
        visible={isModalVisible}
        title="Change Password"
        description={modalMessage}
        buttonText="OK"
        onPressButton={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default changePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  headerTitle: {
    color: theme.colors.foundation_pumpkin_normal,
  },
  headerRightPlaceholder: {
    width: 20,
  },
  headerContainer: {
    backgroundColor: "transparent",
  },
  headerDescription: {
    letterSpacing: 0.42,
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: theme.colors.black_5,
    marginBottom: 26,
    paddingHorizontal: 20,
  },
  submitButton: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 70,
    marginTop: 50,
  },
});
