import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { CustomHeader, JaraText, SectionTitle } from "@/components";
import { theme } from "@/constants/theme";
import { ChevronGreyLeftIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Define data for collected information with bullet points
const informationItems = [
  "Personal Information: This includes your name, email address, phone number, shipping address, and billing information.",
  "Order Information: Details about your orders, including products purchased, quantities, and delivery address.",
  "Payment Information: Credit card or other payment information used to process your orders.",
  "Usage Data: Information about how you use our app, such as your IP address, browser type, device information, and browsing history.",
  "Cookies and Tracking Technologies: We may use cookies and similar tracking technologies to collect data.",
];

const PrivacyPolicy = () => {
  const insets = useSafeAreaInsets();

  // Render each bullet-point item in the list
  const renderInformationItem = ({ item }: { item: string }) => (
    <View style={styles.listItemContainer}>
      <View style={styles.bullet} />
      <JaraText
        color={theme.colors.black_21}
        size={14}
        weight="500"
        lineHeight={23.8}
        style={styles.listText}
      >
        {item}
      </JaraText>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      {/* Custom Header */}
      <CustomHeader
        title="Privacy Policy"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        containerStyle={styles.headerContainer}
      />

      {/* Description Section */}
      <JaraText
        align="center"
        color={theme.colors.black_80}
        size={14}
        weight="500"
        style={styles.headerDescription}
        lineHeight={23.8}
      >
        Read our privacy policy to learn more about how we protect your
        information.{" "}
      </JaraText>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Privacy Intro Text */}
        <JaraText
          align="left"
          color={theme.colors.black_21}
          size={14}
          weight="500"
          lineHeight={23.8}
        >
          Withjara is committed to protecting your privacy. This Privacy Policy
          outlines how we collect, use, disclose, and safeguard your personal
          information when you use our e-commerce app.
        </JaraText>

        {/* Section Title */}
        <SectionTitle
          title="Information We Collect"
          titleStyle={styles.sectionTitle}
        />
        <JaraText
          align="left"
          color={theme.colors.black_21}
          size={14}
          weight="500"
          lineHeight={23.8}
        >
          When you use our app, we may collect the following types of
          information:
        </JaraText>
        {/* Collected Information with Bullet Points */}
        <FlatList
          data={informationItems}
          renderItem={renderInformationItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false} // Prevents FlatList from being scrollable inside ScrollView
        />
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  headerTitle: {
    color: theme.colors.foundation_pumpkin_normal,
  },
  headerContainer: {
    backgroundColor: "transparent",
  },
  headerDescription: {
    letterSpacing: 0.42,
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: theme.colors.black_5,
    paddingHorizontal: 20,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    paddingVertical: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: theme.colors.black_80,
    borderRadius: 3,
    marginTop: 10,
    marginRight: 10,
  },
  listText: {
    flex: 1,
  },
});
