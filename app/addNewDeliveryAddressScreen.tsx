import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { theme } from "@/constants/theme";
import { useAddDeliveryAddress } from "@/hooks/useAddDeliveryAddress";
import { CustomButton, CustomHeader } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronGreyLeftIcon, MapPinIcon } from "@/assets/icons";
import { AddNewDeliveryForm } from "@/components/AddNewDeliveryForm";
import { router } from "expo-router";

const AddNewShippingAddressScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { control, handleSubmit, errors, isButtonActive } =
    useAddDeliveryAddress();

  const onSubmit = () => {
    // Handle the form submission, such as calling an API or updating state
    console.log("Form Submitted");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <CustomHeader
        title="Add New Delivery Address"
        leftComponent={<ChevronGreyLeftIcon />}
        rightComponent={<MapPinIcon />}
        onLeftPress={() => router.back()}
        containerStyle={{ backgroundColor: "transparent" }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <AddNewDeliveryForm control={control} errors={errors} />
      </ScrollView>
      <CustomButton
        title="Save Address"
        onPress={handleSubmit(onSubmit)}
        type="linearGradient"
        style={styles.submitButton}
        disabled={!isButtonActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  submitButton: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 24,
  },
});

export default AddNewShippingAddressScreen;
