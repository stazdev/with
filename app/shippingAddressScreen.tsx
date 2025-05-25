import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  ActionSheetIOS,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
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
import { useFetchAddress, useSetActiveAddress } from "@/hooks/useFetchAddress";
import SuccessAlertModal from "@/components/SuccessAlertModal";

const ShippingAddressScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { data, isLoading, error } = useFetchAddress();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const setActiveAddressMutation = useSetActiveAddress();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={theme.colors.foundation_pumpkin_normal} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <JaraText>Error loading addresses</JaraText>
      </View>
    );
  }

  const addresses =
    data?.data.map((item) => {
      const lastAddress =
        item.addressesResponses[item.addressesResponses.length - 1];
      return {
        id: lastAddress.customerDeliveryAddressId.toString(),
        name: item.type,
        address: `${lastAddress.address}, ${lastAddress.city}, ${lastAddress.country}`,
        isDefault: lastAddress.isActive,
      };
    }) || [];

  const handleAddressSelect = (id: string) => {
    setSelectedAddress(id);
  };

  const handleApply = () => {
    if (selectedAddress) {
      setActiveAddressMutation.mutate(Number(selectedAddress), {
        onSuccess: () => {
          setIsSuccessModalVisible(true);
          // queryClient.invalidateQueries("activeAddress");
        },
      });
    }
  };

  const handleCloseModal = () => {
    setIsSuccessModalVisible(false);
  };

  const renderAddressCard = ({ item }: { item: (typeof addresses)[0] }) => (
    <AddressCard
      LeftComponent={
        <View style={styles.iconContainer}>
          <GradientLocationIcon />
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
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <JaraText
                  size={10}
                  weight="600"
                  color={theme.colors.foundation_pumpkin_normal}
                >
                  Default
                </JaraText>
              </View>
            )}
          </View>
          <JaraText
            size={14}
            weight="500"
            lineHeight={19.6}
            color={theme.colors.grey600}
          >
            {item.address}
          </JaraText>
        </View>
      }
      onPress={() => handleAddressSelect(item.id)}
    />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Success Alert Modal */}
      <SuccessAlertModal
        visible={isSuccessModalVisible}
        title="Success"
        description="Address has been set as active successfully."
        buttonText="OK"
        onPressButton={handleCloseModal}
        onClose={handleCloseModal}
      />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronGreyLeftIcon />
        </Pressable>
        <JaraText size={20} weight="700" lineHeight={24} color="black">
          Shipping Address
        </JaraText>
      </View>

      <JaraText
        size={14}
        weight="500"
        color={theme.colors.black_80}
        style={styles.description}
      >
        Select your delivery location or enter a new address.
      </JaraText>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddressCard}
        contentContainerStyle={styles.addressList}
      />

      <CustomButton
        title="Add New Address"
        titleStyle={{ color: theme.colors.foundation_pumpkin_normal }}
        onPress={() => router.push("/addNewDeliveryAddressScreen")}
        style={styles.addAddressButton}
      />

      <CustomButton
        title="Apply"
        type="linearGradient"
        onPress={handleApply}
        style={styles.applyButton}
      />
    </View>
  );
};

export default ShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
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
  iconContainer: {
    backgroundColor: theme.colors.foundation_pumpkin_light,
    padding: 8,
    borderRadius: 50,
  },
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
