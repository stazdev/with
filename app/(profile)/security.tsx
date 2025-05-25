import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { ChevronGreyLeftIcon, ToggleOff, ToggleOn } from "@/assets/icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileSection from "@/components/ProfileSection";
import ProfileOption from "@/components/ProfileOption";

interface SecuritySetting {
  id: string;
  title: string;
  enabled: boolean;
  onPress: () => void;
}

interface SecuritySection {
  id: string;
  settings: SecuritySetting[];
}

const Security = () => {
  const insets = useSafeAreaInsets();

  const [securitySections, setSecuritySections] = useState<SecuritySection[]>([
    {
      id: "biometric",
      settings: [
        {
          id: "FaceId",
          title: "Face Identification (I.D)",
          enabled: true,
          onPress: () => handleToggle("biometric", "FaceId"),
        },
        {
          id: "Finger",
          title: "Finger Prints",
          enabled: false,
          onPress: () => handleToggle("biometric", "Finger"),
        },
        {
          id: "Pin",
          title: "Pin",
          enabled: false,
          onPress: () => handleToggle("biometric", "Pin"),
        },
      ],
    },
    {
      id: "secup",
      settings: [
        {
          id: "changePin",
          title: "Change Pin",
          enabled: false,
          onPress: () => router.push("/(profile)/changePin"),
        },
        {
          id: "changePassword",
          title: "Change Password",
          enabled: false,
          onPress: () => router.push("/(profile)/changePassword"),
        },
      ],
    },
  ]);

  const handleToggle = (sectionId: string, settingId: string) => {
    setSecuritySections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map((setting) => {
              if (setting.id === settingId) {
                return { ...setting, enabled: !setting.enabled };
              }
              return setting;
            }),
          };
        }
        return section;
      })
    );
  };

  const renderSecurityOption = (
    sectionId: string,
    setting: SecuritySetting
  ) => {
    const isBiometricSection = sectionId === "biometric";

    return (
      <ProfileOption
        key={setting.id}
        title={setting.title}
        onPress={setting.onPress}
        rightIcon={
          isBiometricSection ? (
            setting.enabled ? (
              <ToggleOn />
            ) : (
              <ToggleOff />
            )
          ) : null
        }
      />
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Security"
        titleStyle={styles.headerTitle}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        rightComponent={<View style={styles.headerRightPlaceholder} />}
        containerStyle={styles.headerContainer}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <JaraText
          align="center"
          color={theme.colors.black_21}
          size={14}
          weight="500"
          style={styles.headerDescription}
          lineHeight={23.8}
        >
          Keep your account safe. Manage your security settings here.
        </JaraText>

        {securitySections.map((section) => (
          <View key={section.id}>
            <ProfileSection title="">
              {section.settings.map((setting) =>
                renderSecurityOption(section.id, setting)
              )}
            </ProfileSection>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
  sectionHeader: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    letterSpacing: 0.48,
  },
  sectionDescription: {
    paddingTop: 8,
    paddingBottom: 16,
  },
});

export default Security;
