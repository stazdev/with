import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";
import {
  BankIcon,
  CargoIcon,
  ChevronGreyLeftIcon,
  ChevronRightGreyIcon,
  GradientLocationIcon,
  PayOnDeliveryIon,
  PencilIcon,
  PlusIcon,
  RadioButtonCheckIcon,
  RadioButtonUncheckIcon,
} from "@/assets/icons";
import {
  AddressCard,
  CartItemCard,
  CustomButton,
  JaraText,
  SectionTitle,
} from "@/components";
import JaraInput from "@/components/JaraInput";
import { useFetchActiveAddress } from "@/hooks/useFetchAddress";
import JaraModal from "@/components/JaraModal";
import { useCheckout } from "@/hooks/useFetchOrder";
import * as Network from "expo-network";
import SuccessAlertModal from "@/components/SuccessAlertModal";
// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  cartSessionId: string; // Add cartSessionId to CartItem interface
}

interface OrderSummaryProps {
  amount: number;
  shipping: number;
  total: number;
}

// Common Styles
const commonStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    color: theme.colors.black_80,
    marginBottom: 8,
  },
});

// Custom Hook
const useLocalCheckout = (initialItems: CartItem[]) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isDeleteItemModal, setDeleteItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleDeleteConfirmation = (item: CartItem) => {
    setSelectedItem(item);
    setDeleteItemModal(true);
  };

  const handleDeleteItem = () => {
    if (selectedItem) {
      setItems(items.filter((item) => item.id !== selectedItem.id));
      setSelectedItem(null);
      setDeleteItemModal(false);
    }
  };

  const handlePromoCodeChange = (text: string) => {
    setPromoCode(text);
  };

  const handleApplyPromoCode = () => {
    console.log("Promo code applied:", promoCode);
  };

  return {
    items,
    promoCode,
    isDeleteItemModal,
    selectedItem,
    handleDeleteConfirmation,
    handleDeleteItem,
    handlePromoCodeChange,
    handleApplyPromoCode,
  };
};

// Sub-components
const ShippingSection: React.FC = () => (
  <View style={styles.shippingSection}>
    <SectionTitle
      title="Delivery Distance and Fee"
      titleStyle={commonStyles.sectionTitle}
    />
    <View style={[commonStyles.card]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <JaraText>Delivery fee</JaraText>
        <JaraText>₦2000</JaraText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <JaraText weight="400">Delivery distance</JaraText>
        <JaraText weight="500">3km-10km</JaraText>
      </View>
    </View>
  </View>
);

const AddressSection: React.FC = () => {
  const { data, isLoading, error } = useFetchActiveAddress();

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
        <JaraText>Error loading active address</JaraText>
      </View>
    );
  }

  const activeAddress = data?.data;

  return (
    <View
      style={{
        borderBottomColor: theme.colors.black_20,
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginBottom: 24,
      }}
    >
      <SectionTitle
        title="Shipping Address"
        titleStyle={commonStyles.sectionTitle}
      />
      <AddressCard
        LeftComponent={
          <View
            style={{
              backgroundColor: theme.colors.foundation_pumpkin_light,
              padding: 8,
              borderRadius: 50,
            }}
          >
            <GradientLocationIcon />
          </View>
        }
        RightComponent={<PencilIcon />}
        textContent={
          <>
            <JaraText
              size={18}
              weight="700"
              lineHeight={21.6}
              color={theme.colors.grey900}
              style={{ marginBottom: 6 }}
            >
              {activeAddress?.type}
            </JaraText>
            <JaraText
              size={14}
              weight="500"
              lineHeight={19.6}
              color={theme.colors.grey600}
              style={{}}
            >
              {`${activeAddress?.address}, ${activeAddress?.city}, ${activeAddress?.country}`}
            </JaraText>
          </>
        }
        onPress={() => router.push("/shippingAddressScreen")}
      />
    </View>
  );
};

const PromoCodeSection: React.FC<{
  promoCode: string;
  onChangePromoCode: (text: string) => void;
  onApplyPromoCode: () => void;
}> = ({ promoCode, onChangePromoCode, onApplyPromoCode }) => (
  <View>
    <SectionTitle
      title="Promo Code"
      titleStyle={[commonStyles.sectionTitle, styles.promoTitle]}
    />
    <View style={commonStyles.row}>
      <JaraInput
        placeholder="Enter Promo Code"
        value={promoCode}
        onChangeText={onChangePromoCode}
        style={styles.promoInput}
      />
      <Pressable onPress={() => router.push("/promoScreen")}>
        <LinearGradient
          colors={["#FF2803", "#FF7508"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <JaraText color="#fff">Apply Code</JaraText>
        </LinearGradient>
      </Pressable>
    </View>
  </View>
);

const SummaryRow: React.FC<{
  label: string;
  value: number;
}> = ({ label, value }) => (
  <View style={[commonStyles.row, commonStyles.spaceBetween]}>
    <JaraText
      size={14}
      weight="500"
      color={theme.colors.grey600}
      style={{ flex: 0.7 }}
    >
      {label}
    </JaraText>
    <JaraText align="left" size={18} weight="700" style={{ flex: 0.4 }}>
      ₦{value.toLocaleString()}.00
    </JaraText>
  </View>
);

const OrderSummary: React.FC<{ summary: OrderSummaryProps }> = ({
  summary,
}) => (
  <View style={[commonStyles.card, styles.summaryCard, { paddingBottom: 0 }]}>
    <SummaryRow label="Amount" value={summary.amount} />
    <View style={{ height: 16 }} />
    <SummaryRow label="Shipping" value={summary.shipping} />
    <View style={styles.totalContainer}>
      <SummaryRow label="Total" value={summary.total} />
    </View>
  </View>
);

const calculateOrderSummary = (items: CartItem[]): OrderSummaryProps => {
  const amount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 2000;
  const total = amount + shipping;
  return { amount, shipping, total };
};

// Main Component
const CheckoutScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { cartItems, storeId } = useLocalSearchParams();
  const initialItems = cartItems ? JSON.parse(cartItems as string) : [];
  const cartSessionId =
    initialItems.length > 0 ? initialItems[0].cartSessionId : "";
  const {
    items,
    promoCode,
    handleDeleteConfirmation,
    handlePromoCodeChange,
    handleApplyPromoCode,
  } = useLocalCheckout(initialItems);
  const orderSummary = calculateOrderSummary(items);

  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<number | null>(
    null
  );
  const [customerIPAddress, setCustomerIPAddress] = useState<string>("");
  const [activeAddress, setActiveAddress] = useState<any>(null);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  useEffect(() => {
    const fetchIPAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      setCustomerIPAddress(ip);
    };
    fetchIPAddress();
  }, []);

  const { data, isLoading, error } = useFetchActiveAddress();

  useEffect(() => {
    if (data) {
      setActiveAddress(data.data);
    }
  }, [data]);

  const { mutate: checkout } = useCheckout((data) => {
    console.log("This is Checkout response:", data);
    setSuccessMessage(data.message);
    setCheckoutUrl(data.data.checkoutUrl);
    setSuccessModalVisible(true);
  });

  const handleContinueToPayment = () => {
    setPaymentModalVisible(true);
  };

  const handleProceedToPayment = () => {
    if (selectedPaymentType === 1) {
      router.push("/payOnDeliveryScreen");
    } else if (selectedPaymentType === 2) {
      const checkoutData = {
        storeId: Number(storeId),
        shippingAddressId: activeAddress?.customerDeliveryAddressId || 0,
        cartSessionId: cartSessionId,
        promoCode: promoCode,
        customerIPAddress: customerIPAddress,
        paymentType: 2,
        shippingFees: 2000,
        totalPrice: orderSummary.total,
      };
      checkout(checkoutData);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    if (selectedPaymentType === 2) {
      router.push({
        pathname: "/payOnlineScreen",
        params: { checkoutUrl },
      });
    }
  };

  const renderCartItem: ListRenderItem<CartItem> = ({ item }) => (
    <CartItemCard item={item} onDelete={handleDeleteConfirmation} />
  );

  const renderFooter = () => (
    <>
      <ShippingSection />
      <PromoCodeSection
        promoCode={promoCode}
        onChangePromoCode={handlePromoCodeChange}
        onApplyPromoCode={handleApplyPromoCode}
      />
      <OrderSummary summary={orderSummary} />
      <CustomButton
        title="Continue To Payment"
        type="linearGradient"
        onPress={handleContinueToPayment}
        style={styles.continueButton}
      />
    </>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronGreyLeftIcon />
        </Pressable>
        <JaraText size={20} weight="700" lineHeight={24} color="black">
          Checkout
        </JaraText>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <AddressSection />
            <SectionTitle
              title="Item List"
              titleStyle={[commonStyles.sectionTitle, styles.listHeader]}
            />
          </>
        )}
        ListFooterComponent={renderFooter}
      />
      <JaraModal
        isVisible={isPaymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        initialSnapPoint="30%"
        maxSnapPoint="40%"
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <JaraText weight="700" size={20}>
            Payment Method
          </JaraText>
        </View>
        <View style={styles.paymentModalContent}>
          <Pressable
            style={[styles.paymentOption]}
            onPress={() => setSelectedPaymentType(1)}
          >
            <View style={styles.paymentOptionLeft}>
              <PayOnDeliveryIon />
            </View>
            <JaraText size={18} weight="700" style={styles.paymentOptionText}>
              Pay on Delivery
            </JaraText>
            {selectedPaymentType === 1 ? (
              <RadioButtonCheckIcon />
            ) : (
              <RadioButtonUncheckIcon />
            )}
          </Pressable>
          <Pressable
            style={[styles.paymentOption]}
            onPress={() => setSelectedPaymentType(2)}
          >
            <View style={styles.paymentOptionLeft}>
              <BankIcon />
            </View>
            <JaraText size={18} weight="700" style={styles.paymentOptionText}>
              Pay Online
            </JaraText>
            {selectedPaymentType === 2 ? (
              <RadioButtonCheckIcon />
            ) : (
              <RadioButtonUncheckIcon />
            )}
          </Pressable>
          <CustomButton
            title="Proceed to Payment"
            type="linearGradient"
            style={styles.paymentButton}
            onPress={handleProceedToPayment}
          />
        </View>
      </JaraModal>
      <SuccessAlertModal
        visible={isSuccessModalVisible}
        title="Success"
        description={successMessage}
        buttonText="OK"
        onPressButton={handleSuccessModalClose}
        onClose={handleSuccessModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    marginLeft: 10,
  },
  backButton: {
    padding: 8,
  },
  shippingSection: {
    borderTopColor: theme.colors.black_20,
    borderBottomColor: theme.colors.black_20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 32,
    paddingBottom: 16,
    marginBottom: 32,
    marginTop: 16,
    marginHorizontal: 20,
  },
  promoTitle: {
    marginLeft: 20,
  },
  promoInput: {
    backgroundColor: theme.colors.white,
    borderColor: "transparent",
    marginBottom: 8,
    borderRadius: 16,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    marginLeft: 20,
    paddingVertical: 2,
    flex: 1,
  },
  gradient: {
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  summaryCard: {
    marginVertical: 16,
    marginHorizontal: 20,
  },
  totalContainer: {
    borderTopColor: theme.colors.black_20,
    borderTopWidth: 1,
    marginVertical: 20,
    paddingTop: 20,
  },
  listHeader: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  continueButton: {
    marginHorizontal: 20,
    marginTop: 120,
    marginBottom: 40,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  paymentModalContent: {
    padding: 20,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    marginBottom: 16,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  selectedOption: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 2,
  },
  paymentOptionLeft: {
    backgroundColor: theme.colors.foundation_pumpkin_light,
    padding: 8,
    borderRadius: 50,
    marginRight: 16,
  },
  paymentOptionText: {
    flex: 1,
  },
  paymentButton: {
    marginBottom: 16,
  },
});

export default CheckoutScreen;
