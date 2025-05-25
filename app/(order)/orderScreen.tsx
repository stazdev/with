import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React from "react";
import { CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchGreyIcon, ActiveOrderIcon } from "@/assets/icons";
import { useFetchOrders } from "@/hooks/useFetchOrder";

const TABS = [
  {
    title: "Active Orders",
    icon: <ActiveOrderIcon />,
    key: "Active",
    borderColor: theme.colors.green,
    ordersEnum: 1,
    statusText: "In Delivery",
  },
  {
    title: "Returned Orders",
    icon: <ActiveOrderIcon />,
    key: "Returned",
    borderColor: theme.colors.foundation_green_light,
    ordersEnum: 2,
    statusText: "Returned",
  },
  {
    title: "Completed Orders",
    icon: <ActiveOrderIcon />,
    key: "Completed",
    borderColor: theme.colors.green,
    ordersEnum: 3,
    statusText: "Completed",
  },
  {
    title: "Cancelled Orders",
    icon: <ActiveOrderIcon />,
    key: "Cancelled",
    borderColor: theme.colors.primary,
    ordersEnum: 4,
    statusText: "Cancelled",
  },
];

const DEFAULT_IMAGE_URI =
  "https://res.cloudinary.com/lomee31/image/upload/v1727904884/WITHJARAicon1_fkkyya.png";

const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = React.useState("Active");

  const selectedTabConfig = TABS.find((tab) => tab.key === selectedTab);
  const { data, isLoading, error } = useFetchOrders(
    selectedTabConfig?.ordersEnum || 1
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <JaraText color={theme.colors.black_80}>
            Failed to load orders. Please try again.
          </JaraText>
        </View>
      );
    }

    if (!data?.data || data.data.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <JaraText color={theme.colors.black_80}>
            No orders found for this category.
          </JaraText>
        </View>
      );
    }

    return data.data.map((order) => (
      <OrderCard
        key={order.orderId}
        order={order}
        statusColor={selectedTabConfig?.borderColor}
        statusText={selectedTabConfig?.statusText || ""}
      />
    ));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader title={"My Orders"} rightComponent={<SearchGreyIcon />} />

      <TabBar
        tabs={TABS}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const TabBar = ({ tabs, selectedTab, onSelectTab }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabContainer}
  >
    {tabs.map((tab) => (
      <TabButton
        key={tab.key}
        tab={tab}
        isSelected={selectedTab === tab.key}
        onPress={() => onSelectTab(tab.key)}
      />
    ))}
  </ScrollView>
);

const TabButton = ({ tab, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.tabButton,
      {
        borderBottomColor: isSelected ? tab.borderColor : theme.colors.black_20,
      },
    ]}
    onPress={onPress}
  >
    {tab.icon}
    <Text
      style={[
        styles.tabText,
        { color: isSelected ? tab.borderColor : theme.colors.black },
      ]}
    >
      {tab.title}
    </Text>
  </TouchableOpacity>
);

const OrderCard = ({ order, statusColor, statusText }) => {
  const firstImage =
    order.orderProductItem.images?.split(",")[0] || DEFAULT_IMAGE_URI;

  return (
    <View style={styles.orderCard}>
      <Image
        source={{ uri: firstImage }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.orderDetailsContainer}>
        <JaraText size={18} weight="700">
          {order.orderProductItem.name}
        </JaraText>
        <View style={[styles.statusPill, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
        <JaraText color={theme.colors.black_80}>
          ${order.totalSum.toFixed(2)}
        </JaraText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  tabContainer: {
    height: 48,
    paddingHorizontal: theme.spacing.m,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 2,
    marginRight: theme.spacing.l,
  },
  tabText: {
    marginLeft: theme.spacing.s,
    fontSize: theme.fontSizes.medium,
    fontWeight: "600",
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.m,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: theme.spacing.s,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: theme.spacing.m,
  },
  orderDetailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 12,
    marginVertical: theme.spacing.s,
  },
  statusText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.small,
    fontWeight: "700",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
});

export default OrderScreen;
