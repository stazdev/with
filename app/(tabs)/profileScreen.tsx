import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileSection from "@/components/ProfileSection";
import ProfileOption from "@/components/ProfileOption";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";
import {
  BellSmallIcon,
  CartSmallIcon,
  EditIcon,
  FileSmallIcon,
  GlobeSmallIcon,
  HeadSetSmallIcon,
  HeartSmallIcon,
  KeySmallIcon,
  MapSmallIcon,
  MoneySmallIcon,
  PercentSmallIcon,
  ShieldSmallIcon,
  SignoutIcon,
  UserGearSmallIcon,
  UserIcon,
  UsersSmallIcon,
  WalletSmallIcon,
} from "@/assets/icons";
import { JaraText } from "@/components";
import { router, useRouter } from "expo-router"; // Ensured useRouter is available if needed, though router object is used directly
import { useFetchAccount } from "@/hooks/useFetchAccount";
import useProfileStore from "@/store/profileStore";
import { useAuthStore } from "@/store/authStore";
import LoginPromptModal from "@/components/LoginPromptModal";
import { useEffect } from "react"; // Ensure useEffect is imported

const HEADER_EXPANDED_HEIGHT = 180;
const HEADER_COLLAPSED_HEIGHT = 90;
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { authToken } = useAuthStore();
  // const router = useRouter(); // router object from "expo-router" is used directly

  // Conditionally fetch account data only if logged in
  const { data, isLoading, error } = useFetchAccount(!!authToken); 
  const { profileData } = useProfileStore();

  useEffect(() => {
    if (data) {
      const { setProfileData } = useProfileStore.getState();
      setProfileData(data.data);
    }
  }, [data]);

  const imageScale = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0.5],
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const accountOptions = [
    {
      title: "My Personal Data",
      icon: <UserIcon />,
      onPress: () => router.push("/(profile)/myProfile"),
    },
    {
      title: "My Favorites",
      icon: <HeartSmallIcon />,
      onPress: () => router.push("/(tabs)/favoritesScreen"),
    },
    {
      title: "My Orders",
      icon: <CartSmallIcon />,
      badge: "In Delivery",
      onPress: () => router.push("/(order)/orderScreen"),
    },
    {
      title: "Notifications",
      icon: <BellSmallIcon />,
      badge: "4",
      onPress: () => router.push("/(profile)/notifications"),
    },
    {
      title: "Available Discounts",
      icon: <PercentSmallIcon />,
      badge: "4 Unused",
    },
    { title: "Transaction History", icon: <MoneySmallIcon /> },
  ];

  const settingsOptions = [
    {
      title: "Address",
      icon: <MapSmallIcon />,
      onPress: () => router.push("/addNewDeliveryAddressScreen"),
    },
    // { title: "Notification", icon: <BellSmallIcon /> },
    {
      title: "Payment",
      icon: <WalletSmallIcon />,
      onPress: () => router.push("/(profile)/payment"),
    },
    {
      title: "Account Security",
      icon: <KeySmallIcon />,
      onPress: () => router.push("/(profile)/security"),
    },
    { title: "Language", icon: <GlobeSmallIcon /> },
  ];

  const referralsOptions = [
    {
      title: "Invite Friends & Earn",
      icon: <UsersSmallIcon />,
      onPress: () => router.push("/(profile)/inviteFriend"),
    },
    { title: "Become A Vendor", icon: <UserGearSmallIcon /> },
  ];

  const aboutOptions = [
    {
      title: "WithJara Terms & Conditions",
      icon: <FileSmallIcon />,
      onPress: () => router.push("/(profile)/termsAndConditions"),
    },
    {
      title: "WithJara Privacy Policy",
      icon: <ShieldSmallIcon />,
      onPress: () => router.push("/(profile)/privacyPolicy"),
    },
    {
      title: "Customer Support",
      icon: <HeadSetSmallIcon />,
      onPress: () => router.push("/(profile)/customerSupport"),
    },
  ];

  const renderOptions = (options: any[]) =>
    options.map(
      (
        option: {
          title: string;
          onPress: any;
          icon:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
          badge: string | undefined;
        },
        index: React.Key | null | undefined
      ) => (
        <ProfileOption
          key={index}
          title={option.title}
          onPress={option.onPress || (() => {})}
          leftIcon={option.icon}
          badge={option.badge}
        />
      )
    );

  // Guest User Check: This should come before isLoading and error checks for useFetchAccount
  if (!authToken) {
    return (
      <LoginPromptModal
        isVisible={true}
        onClose={() => router.replace("/(tabs)/homeScreen")}
        title="Access Your Profile"
        message="Please log in or sign up to view and manage your profile details."
      />
    );
  }

  // Logged-in User: Proceed with loading, error, and content rendering
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <JaraText size={16} weight="600" color={theme.colors.primary}>
          Failed to load profile data. Please try again later.
        </JaraText>
      </View>
    );
  }

  // Ensure profileData is available before rendering the main content
  if (!profileData) {
     // This can be a more sophisticated loading state or a simple null/message
     // For now, showing a loading indicator as data might still be processing by Zustand
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#FF7508", "#1A2610"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.screen}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: HEADER_EXPANDED_HEIGHT }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[
              styles.profileImageContainer,
              {
                transform: [
                  { scale: imageScale },
                  { translateY: imageTranslateY },
                ],
              },
            ]}
          >
            <Animated.Image
              source={{
                uri:
                  profileData.profileImage || // Assuming profileData is guaranteed here
                  "https://via.placeholder.com/100",
              }}
              style={styles.profileImage}
            />
          </Animated.View>

          <TouchableOpacity style={styles.editIcon}>
            <EditIcon />
            <JaraText size={16} weight="600" color={theme.colors.black_21}>
              Edit
            </JaraText>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <ProfileHeader
              fullName={profileData.fullName}
              email={profileData.email}
              phoneNumber={profileData.phoneNumber}
            />
            <ProfileSection title="My Account">
              {renderOptions(accountOptions)}
            </ProfileSection>
            <ProfileSection title="My Account Settings">
              {renderOptions(settingsOptions)}
            </ProfileSection>
            <ProfileSection title="Referrals & Invite">
              {renderOptions(referralsOptions)}
            </ProfileSection>
            <ProfileSection title="About Us">
              {renderOptions(aboutOptions)}
            </ProfileSection>

            <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
              <SignoutIcon />
              <JaraText size={16} weight="500" color={theme.colors.black_80}>
                Log Out
              </JaraText>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  profileImageContainer: {
    position: "absolute",
    top: 60,
    left: width / 2 - 90,
    transform: [{ translateX: -90 }],
    zIndex: 2,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  editIcon: {
    position: "absolute",
    top: 200,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black_20,
    padding: 4,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: theme.colors.foundation_white_dark,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginVertical: 24,
    width: "60%",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
