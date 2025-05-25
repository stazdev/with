import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { CustomButton, CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronGreyLeftIcon,
  Paypal,
  GoogleBig,
  AppleBig,
  MasterCard,
} from "@/assets/icons"; // Example icons
import { router } from "expo-router";
import ProfileOption from "@/components/ProfileOption";

const paymentOptions = [
  {
    icon: <Paypal />,
    title: "PayPal",
    badge: "Default",
    status: "Connected",
    onPress: () => console.log("PayPal Pressed"),
  },
  {
    icon: <GoogleBig />,
    title: "Google Pay",
    status: "Connected",
    onPress: () => console.log("Google Pay Pressed"),
  },
  {
    icon: <AppleBig />,
    title: "Apple Pay",
    status: "Connected",
    onPress: () => console.log("Apple Pay Pressed"),
  },
  {
    icon: <MasterCard />,
    title: "**** **** **** 1234",
    status: "Connected",
    onPress: () => console.log("Card Pressed"),
  },
];

const Payments = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Payments"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        rightComponent={<View style={styles.headerRightPlaceholder} />}
        containerStyle={styles.headerContainer}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <JaraText
          size={14}
          weight="500"
          style={styles.headerDescription}
          align="center"
        >
          Manage your payment options with ease. Update your payment methods and
          settings here.
        </JaraText>

        {paymentOptions.map((option, index) => (
          <View
            style={{
              backgroundColor: theme.colors.white,
              marginVertical: 4,
              borderRadius: 50,
              paddingHorizontal: 20,
            }}
          >
            <ProfileOption
              key={index}
              leftIcon={option.icon}
              title={option.title}
              badge={option.badge}
              rightIcon={
                <JaraText
                  children={option.status}
                  size={16}
                  weight="700"
                  color={theme.colors.foundation_pumpkin_normal}
                />
              }
              onPress={option.onPress}
            />
          </View>
        ))}

        {/* <TouchableOpacity
          style={styles.addCardButton}
          onPress={() => console.log("Add Card Pressed")}
        >
          <JaraText size={16} weight="600" color={theme.colors.white}>
            Add New Card
          </JaraText>
        </TouchableOpacity> */}
        <CustomButton
          style={{ marginTop: 80 }}
          type="linearGradient"
          title={"Add New Card"}
          onPress={() => console.log("card added")}
        />
      </ScrollView>
    </View>
  );
};

export default Payments;

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
    // paddingHorizontal: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  addCardButton: {
    backgroundColor: theme.colors.foundation_pumpkin_normal,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
  },
});
