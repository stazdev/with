import { Pressable, StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import {
  BikeIcon,
  BoxIcon,
  BusIcon,
  ChevronGreyLeftIcon,
  GradientLocationIcon,
  RadioButtonCheckIcon,
  RadioButtonUncheckIcon,
} from "@/assets/icons";
import { JaraText, CustomButton } from "@/components";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import AddressCard from "@/components/AddressCard";

const addresses = [
  {
    id: "1",
    name: "Economy",
    arrival: "Estimated Arrival, jul 14-18.",
    price: 3000,
    icon: <BusIcon />,
  },
  {
    id: "2",
    name: "Regular",
    arrival: "Estimated Arrival, jul 14-18.",
    price: 3000,
    icon: <BoxIcon />,
  },
  {
    id: "3",
    name: "Cargo",
    arrival: "Estimated Arrival, jul 14-18.",
    price: 3000,
    icon: <BusIcon />,
  },
  {
    id: "4",
    name: "Express",
    arrival: "Estimated Arrival, jul 14-18.",
    price: 3000,
    icon: <BikeIcon />,
  },
];

const chooseDeliveryScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const renderAddressCard = ({ item }: { item: (typeof addresses)[0] }) => (
    <AddressCard
      LeftComponent={<View style={styles.iconContainer}>{item.icon}</View>}
      RightComponent={
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingLeft: 10,
          }}
        >
          <JaraText
            size={20}
            weight="700"
            lineHeight={24}
            color={theme.colors.foundation_pumpkin_normal}
          >
            ₦{item.price}
          </JaraText>
          {selectedAddress === item.id ? (
            <RadioButtonCheckIcon />
          ) : (
            <RadioButtonUncheckIcon />
          )}
        </View>
      }
      textContent={
        <View>
          <View style={styles.cardHeader}>
            <JaraText
              size={18}
              weight="700"
              lineHeight={21.6}
              color={theme.colors.grey900}
            >
              {item.name}
            </JaraText>
          </View>
          <JaraText
            size={14}
            weight="500"
            lineHeight={19.6}
            color={theme.colors.grey600}
          >
            {item.arrival}
          </JaraText>
        </View>
      }
      onPress={() => handleAddressSelect(item.id)}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronGreyLeftIcon />
        </Pressable>
        <JaraText size={20} weight="700" lineHeight={24} color="black">
          Choose Delivery
        </JaraText>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddressCard}
        contentContainerStyle={styles.addressList}
      />

      <CustomButton
        title="Apply"
        type="linearGradient"
        onPress={() => {}}
        style={styles.applyButton}
      />
    </View>
  );
};

export default chooseDeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  description: {
    marginBottom: 20,
  },
  addressList: {
    paddingBottom: 20,
  },
  addAddressButton: {
    backgroundColor: theme.colors.foundation_pumpkin_light_hover,
    marginTop: 60,
    marginBottom: 39,
  },
  applyButton: {
    marginTop: 24,
    marginBottom: 36,
  },
  iconContainer: {},
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  defaultBadge: {
    backgroundColor: theme.colors.foundation_pumpkin_light,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
