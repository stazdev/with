import React from "react";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import { CustomHeader, JaraText, SectionTitle } from "@/components";
import { theme } from "@/constants/theme";
import { ChevronGreyLeftIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TermsAndConditions = () => {
  const insets = useSafeAreaInsets();

  const renderListItem = (text: string) => (
    <View style={styles.listItemContainer}>
      <JaraText
        align="left"
        color={theme.colors.black_21}
        size={14}
        weight="500"
        lineHeight={23.8}
        style={styles.listText}
      >
        {text}
      </JaraText>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <CustomHeader
        title="Terms & Conditions"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        containerStyle={styles.headerContainer}
      />

      <JaraText
        align="center"
        color={theme.colors.black_80}
        size={14}
        weight="500"
        style={styles.headerDescription}
        lineHeight={23.8}
      >
        For important information, please read our Terms & Conditions.
      </JaraText>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SectionTitle
          title="WithJara Terms & Conditions"
          titleStyle={styles.sectionTitleHeader}
        />
        <JaraText
          align="left"
          color={theme.colors.black_21}
          size={14}
          weight="500"
          lineHeight={23.8}
        >
          Effective Date: 12/12/12
        </JaraText>

        <SectionTitle
          title="1. Acceptance of Terms"
          titleStyle={styles.sectionTitle}
        />
        {renderListItem(
          "By accessing or using the WithJara app, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use the app."
        )}

        <SectionTitle
          title="2. Use of the App"
          titleStyle={styles.sectionTitle}
        />
        {renderListItem(
          "You must be at least 18 years old to use the WithJara app. You agree to use the app in accordance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account information."
        )}

        <SectionTitle
          title="3. Products and Services"
          titleStyle={styles.sectionTitle}
        />
        {renderListItem(
          "We reserve the right to modify or discontinue products and services at any time. Product descriptions and images are for illustrative purposes only."
        )}
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;

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
  sectionTitleHeader: {
    color: theme.colors.foundation_pumpkin_normal,
    paddingBottom: 10,
  },
  sectionTitle: {
    // paddingVertical: 10,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 4,
  },

  listText: {
    flex: 1,
  },
});
