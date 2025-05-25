import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/theme";
import { CustomButton, JaraText } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AramexIcon,
  ChevronGreyLeftIcon,
  ChevronLeftWhiteIcon,
  DhlIcon,
  FacebookSmallIcon,
  FedexIcon,
  PostnlIcon,
  StarIcon,
  VerifiedIcon,
  WhatsAppSmallIcon,
  XIcon,
} from "@/assets/icons";

const StoreDetailScreen = () => {
  const insets = useSafeAreaInsets();
  const { id, name, followers, image, description, tagline, avgRating } =
    useLocalSearchParams();

  const shipmentOptions = [
    {
      id: 1,
      name: "DHL",
      details: "International, Sameday, Domestic",
      logo: <DhlIcon />,
    },
    {
      id: 2,
      name: "FedEx",
      details: "International, Sameday, Domestic",
      logo: <FedexIcon />,
    },
    {
      id: 3,
      name: "PostNL",
      details: "International, Domestic",
      logo: <PostnlIcon />,
    },
    {
      id: 4,
      name: "Aramex",
      details: "International, Domestic",
      logo: <AramexIcon />,
    },
  ];

  return (
    <ScrollView style={[styles.container]}>
      <StatusBar barStyle={"light-content"} />
      {/* Header Section */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftWhiteIcon />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <StarIcon />
            <JaraText color={theme.colors.white}>{avgRating} ratings</JaraText>
          </View>
        </View>
        <Image source={{ uri: image }} style={styles.storeImage} />
        <View style={styles.headerTextContainer}>
          <JaraText
            size={24}
            weight="700"
            lineHeight={31.2}
            color={theme.colors.white}
          >
            {name}
          </JaraText>
          <VerifiedIcon />
        </View>
        <JaraText
          size={14}
          weight="400"
          color={theme.colors.foundation_white_dark}
          lineHeight={22}
        >
          {tagline}
        </JaraText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 24,
          }}
        >
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity style={styles.iconContainer}>
              <FacebookSmallIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <WhatsAppSmallIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <XIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.followersAndButtonContainer}>
            <JaraText
              size={14}
              weight="600"
              lineHeight={22}
              color={theme.colors.foundation_white_dark}
            >
              {followers} follower
            </JaraText>
            <CustomButton
              type="linearGradient"
              title="Follow"
              onPress={() => {}}
              titleStyle={{ fontSize: 12 }}
              style={styles.followButton}
            />
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <JaraText
          size={16}
          weight="600"
          color={theme.colors.black}
          lineHeight={26.4}
          style={{ letterSpacing: 0.16, marginBottom: 12 }}
        >
          About {name}
        </JaraText>
        <JaraText
          size={14}
          weight="400"
          lineHeight={23.1}
          color={theme.colors.black_80}
        >
          {description}
        </JaraText>
      </View>

      {/* Shipment Section */}
      <View style={styles.section}>
        <JaraText
          size={16}
          weight="700"
          color={theme.colors.black}
          lineHeight={27}
          style={{ letterSpacing: 0.16, marginBottom: 12 }}
        >
          Shipment
        </JaraText>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.colors.black_5,
            borderRadius: 12,
          }}
        >
          {shipmentOptions.map((option) => (
            <View key={option.id} style={styles.shipmentItem}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.colors.white,
                  borderRadius: 24,
                }}
              >
                {option.logo}
              </View>
              <View style={styles.shipmentDetails}>
                <JaraText
                  size={14}
                  weight="700"
                  color={theme.colors.grey900}
                  lineHeight={23.8}
                  style={{ letterSpacing: 0.1 }}
                >
                  {option.name}
                </JaraText>
                <JaraText
                  size={12}
                  weight="400"
                  color={theme.colors.black_21}
                  lineHeight={20.4}
                  style={{ letterSpacing: 0.2 }}
                >
                  {option.details}
                </JaraText>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginVertical: 40,
        }}
      >
        <CustomButton
          title={"Report"}
          onPress={() =>
            router.push({
              pathname: "/(store)/reportStore", // Update with the actual path of ReportScreen in your project
              params: { name, image, id },
            })
          }
          style={{ backgroundColor: theme.colors.foundation_pumpkin_light }}
          titleStyle={{ color: theme.colors.foundation_pumpkin_normal }}
        />
        <CustomButton
          title={"Add Review"}
          onPress={() => {}}
          type="linearGradient"
          style={{}}
        />
      </View>
    </ScrollView>
  );
};

export default StoreDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  header: {
    alignItems: "center",
    backgroundColor: theme.colors.foundation_green_normal,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    marginTop: -15,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    marginTop: 16,
    gap: 12,
  },
  storeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
    color: theme.colors.black,
  },
  tagline: {
    fontSize: 14,
    color: theme.colors.black_21,
    textAlign: "center",
    marginVertical: 8,
  },
  socialIconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  iconContainer: {
    backgroundColor: theme.colors.white,
    padding: 3,
    borderRadius: 50,
  },
  followersAndButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  followers: {
    fontSize: 14,
    color: theme.colors.black_80,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  section: {
    marginTop: 28,
    paddingLeft: 20,
    paddingRight: 19,
  },

  shipmentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: theme.colors.black_5,
    borderBottomWidth: 1,
  },
  shipmentLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  shipmentDetails: {
    flex: 1,
  },
  shipmentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  shipmentInfo: {
    fontSize: 14,
    color: theme.colors.black_70,
  },
});
