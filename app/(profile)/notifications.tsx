import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { ChevronGreyLeftIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileSection from "@/components/ProfileSection";
import ProfileOption from "@/components/ProfileOption";
import {
  useFetchNotificationSettings,
  useUpdateNotificationSettings,
} from "@/hooks/useFetchAccount";
import SuccessAlertModal from "@/components/SuccessAlertModal";

interface SectionHeaderProps {
  title: string;
  description: string;
}

interface NotificationSetting {
  id: string;
  title: string;
  enabled: boolean;
}

interface NotificationSection {
  id: string;
  title: string;
  description: string;
  settings: NotificationSetting[];
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => (
  <View style={styles.sectionHeader}>
    <JaraText
      color={theme.colors.black}
      size={16}
      weight="600"
      style={styles.sectionTitle}
    >
      {title}
    </JaraText>
    <JaraText
      color={theme.colors.black_80}
      size={12}
      weight="400"
      style={styles.sectionDescription}
    >
      {description}
    </JaraText>
  </View>
);

const Notifications = () => {
  const insets = useSafeAreaInsets();
  const { data, isLoading, error } = useFetchNotificationSettings();
  const {
    mutate: updateSettings,
    isSuccess,
    reset,
  } = useUpdateNotificationSettings();

  const [notificationSections, setNotificationSections] = useState<
    NotificationSection[]
  >([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setNotificationSections([
        {
          id: "push",
          title: "Push Notifications",
          description:
            "Don't miss out! Enable push notifications for latest updates.",
          settings: [
            {
              id: "promo",
              title: "Promo & Discount",
              enabled: data.data.isPromoDiscount,
            },
            { id: "payments", title: "Payments", enabled: data.data.isPayment },
            {
              id: "updates",
              title: "WithJara App Updates",
              enabled: data.data.isAppUpdate,
            },
            {
              id: "stores",
              title: "New Stores & Products",
              enabled: data.data.isNewStoresProducts,
            },
            {
              id: "orderStatus",
              title: "Order Status",
              enabled: data.data.isOrderStatus,
            },
            {
              id: "deliveryStatus",
              title: "Delivery Status",
              enabled: data.data.isDeliveryStatus,
            },
            {
              id: "orderTracking",
              title: "Order Tracking",
              enabled: data.data.isOrderTracking,
            },
          ],
        },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessModalVisible(true);
      reset();
    }
  }, [isSuccess, reset]);

  const handleToggle = (sectionId: string, settingId: string) => {
    setNotificationSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map((setting) => {
              if (setting.id === settingId) {
                const updatedSetting = {
                  ...setting,
                  enabled: !setting.enabled,
                };
                updateSettings({
                  isPromoDiscount:
                    updatedSetting.id === "promo"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "promo")?.enabled,
                  isPayment:
                    updatedSetting.id === "payments"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "payments")
                          ?.enabled,
                  isAppUpdate:
                    updatedSetting.id === "updates"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "updates")
                          ?.enabled,
                  isNewStoresProducts:
                    updatedSetting.id === "stores"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "stores")
                          ?.enabled,
                  isOrderStatus:
                    updatedSetting.id === "orderStatus"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "orderStatus")
                          ?.enabled,
                  isDeliveryStatus:
                    updatedSetting.id === "deliveryStatus"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "deliveryStatus")
                          ?.enabled,
                  isExpiredVouchers: false, // Assuming this is not used in the UI
                  isOrderTracking:
                    updatedSetting.id === "orderTracking"
                      ? updatedSetting.enabled
                      : section.settings.find((s) => s.id === "orderTracking")
                          ?.enabled,
                });
                return updatedSetting;
              }
              return setting;
            }),
          };
        }
        return section;
      })
    );
  };

  const renderNotificationOption = (
    sectionId: string,
    setting: NotificationSetting
  ) => (
    <ProfileOption
      key={setting.id}
      title={setting.title}
      padding={true}
      rightIcon={
        <Switch
          value={setting.enabled}
          onValueChange={() => handleToggle(sectionId, setting.id)}
          style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }] }}
          trackColor={{
            false: theme.colors.foundation_pumpkin_light_hover,
            true: theme.colors.primary,
          }}
          thumbColor={setting.enabled ? theme.colors.white : theme.colors.white}
        />
      }
    />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <JaraText color={theme.colors.primary} size={16} weight="600">
          Failed to load notification settings.
        </JaraText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="Notifications"
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
      >
        Control your notifications. Choose what matters.
      </JaraText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {notificationSections.map((section) => (
          <View key={section.id}>
            <SectionHeader
              title={section.title}
              description={section.description}
            />
            <ProfileSection title="">
              {section.settings.map((setting) =>
                renderNotificationOption(section.id, setting)
              )}
            </ProfileSection>
          </View>
        ))}
      </ScrollView>
      <SuccessAlertModal
        visible={successModalVisible}
        title="Success"
        description="Notification settings updated successfully."
        buttonText="OK"
        onPressButton={() => setSuccessModalVisible(false)}
        onClose={() => setSuccessModalVisible(false)}
      />
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notifications;
