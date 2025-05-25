import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";
import { CollapsibleSection, CustomHeader, JaraText } from "@/components";
import { SearchGreyIcon, ChatIcon, ChevronDarkLeftIcon } from "@/assets/icons";
import StoreCategoryList from "../(store)/StoreCategory";
import { router } from "expo-router";

// Screen height constant
const { height } = Dimensions.get("window");

// Interface for FAQ items
interface FAQItem {
  id: string;
  title: string;
  content: string;
}

// Interface for the category item
interface Category {
  id: string;
  name: string;
}

const CustomerSupport: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  const categories: Category[] = [
    { id: "1", name: "General" },
    { id: "2", name: "Account" },
    { id: "3", name: "Service" },
    { id: "4", name: "Payment" },
  ];

  const faqItems: FAQItem[] = [
    {
      id: "1",
      title: "How do I create an account on WithJara?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "2",
      title: "How can I search for products on Withjara?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "3",
      title: "What payment methods does Withjara accept?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "4",
      title: "How can I track my order on WithJara?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const renderFAQItem = ({ item }: { item: FAQItem }) => (
    <View style={styles.supportCard}>
      <CollapsibleSection
        title={item.title}
        titleStyle={styles.collapsibleTitle}
      >
        <View style={styles.collapsibleContent}>
          <JaraText
            size={12}
            weight="400"
            color={theme.colors.black_80}
            style={{ letterSpacing: 0.2, paddingHorizontal: 20 }}
            lineHeight={16.8}
          >
            {item.content}
          </JaraText>
        </View>
      </CollapsibleSection>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FF7508", "#1A2610"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <CustomHeader
          containerStyle={{
            backgroundColor: "transparent",
            marginTop: 24,
            zIndex: 100,
          }}
          leftComponent={<ChevronDarkLeftIcon />}
          onLeftPress={() => router.back()}
        />
        <View style={styles.topContainer}>
          <View style={{ flex: 0.4 }} />

          <View style={styles.topRight}>
            <JaraText
              size={40}
              weight="600"
              color={theme.colors.white}
              style={{ letterSpacing: 1.2 }}
              align="left"
            >
              Talk To Ada
            </JaraText>

            <JaraText
              size={14}
              weight="400"
              color={theme.colors.white}
              lineHeight={22.4}
              style={{ letterSpacing: 0.14, maxWidth: 223 }}
              align="left"
            >
              Encountered an issue? Don't worry, Ada is ready to help. Let's get
              you back on track.
            </JaraText>
            <TouchableOpacity style={styles.chatButton} onPress={() => {}}>
              <ChatIcon />
              <JaraText size={16} weight="500" color={theme.colors.black_80}>
                Chat With Ada
              </JaraText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ position: "absolute", top: -220 }}>
            <Image source={require("@/assets/images/ada.png")} />
          </View>
          <JaraText
            size={24}
            weight="600"
            color={theme.colors.black}
            style={styles.headerText}
            align="center"
          >
            FAQ
          </JaraText>
          <JaraText
            size={14}
            weight="500"
            color={theme.colors.black_21}
            style={styles.subHeaderText}
            align="center"
          >
            Learn more about Withjara with our helpful FAQs
          </JaraText>
          <View>
            <StoreCategoryList
              categories={categories}
              onCategoryPress={() => {}}
            />
          </View>
          <View style={styles.searchInput}>
            <SearchGreyIcon />
            <TextInput
              placeholder="Search"
              placeholderTextColor={theme.colors.black_20}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={styles.textInput}
            />
          </View>

          <FlatList
            data={faqItems}
            renderItem={renderFAQItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.faqList}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.25,
    flexDirection: "row",
  },
  topRight: {
    flex: 0.6,
    marginRight: 20,
  },
  contentContainer: {
    backgroundColor: theme.colors.foundation_white_light_hover,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 20,
    flex: 1,
  },
  headerText: {
    letterSpacing: 0.48,
    marginTop: 16,
  },
  subHeaderText: {
    letterSpacing: 0.28,
    marginTop: 12,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.black_5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
  },
  faqList: {
    paddingBottom: 20,
  },
  supportCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginVertical: 10,
    paddingVertical: 12,
    // paddingHorizontal: 16,
    marginHorizontal: 20,
  },
  collapsibleTitle: {
    fontSize: 14,
  },
  collapsibleContent: {
    paddingTop: 10,
  },
  chatButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.foundation_white_dark,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 24,
    width: "70%",
  },
});
