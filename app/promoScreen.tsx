import { Pressable, StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import {
  ChevronGreyLeftIcon,
  PromoIcon,
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
    name: "Percentage discount",
    address: "Enjoy 20% off your order!",
    discountPercentage: 20,
  },
  {
    id: "2",
    name: "Special 25% Off",
    address: "Enjoy 20% off your order!",
    discountPercentage: 20,
  },
  {
    id: "3",
    name: "Withjara offer",
    address: "Enjoy 20% off your order!",
    discountPercentage: 20,
  },
];

const PromoScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleAddressSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const renderAddressCard = ({ item }: { item: (typeof addresses)[0] }) => (
    <AddressCard
      LeftComponent={
        <View style={styles.iconContainer}>
          <PromoIcon />
        </View>
      }
      RightComponent={
        selectedAddress === item.id ? (
          <RadioButtonCheckIcon />
        ) : (
          <RadioButtonUncheckIcon />
        )
      }
      textContent={
        <View style={{ marginRight: 10 }}>
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
            {item.address}
          </JaraText>
          <View style={styles.promoDetails}>
            <View style={styles.defaultBadge}>
              <JaraText size={10} weight="600" color={theme.colors.black}>
                Code
              </JaraText>
            </View>
            <JaraText
              size={14}
              weight="500"
              lineHeight={19.6}
              color={theme.colors.grey600}
            >
              SAVE {item.discountPercentage}
            </JaraText>
          </View>
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
          Add Promo or Discount
        </JaraText>
      </View>

      <JaraText
        size={14}
        weight="500"
        color={theme.colors.black_80}
        style={styles.description}
      >
        Explore our awesome offers and pick one.
      </JaraText>

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

export default PromoScreen;

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
    // padding: 8,
  },
  description: {
    marginBottom: 20,
  },
  addressList: {
    paddingBottom: 20,
  },
  applyButton: {
    marginTop: 24,
    marginBottom: 36,
  },
  iconContainer: {
    width: 80,
    height: 80,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  promoDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  defaultBadge: {
    backgroundColor: theme.colors.foundation_pumpkin_light,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
