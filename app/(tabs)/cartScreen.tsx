import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  CartItemCard,
  CustomButton,
  CustomHeader,
  JaraModal,
  JaraText,
} from "@/components";
import {
  CartStyleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DiagonalArrowUp,
  JaraTag,
  SearchGreyIcon,
} from "@/assets/icons";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { truncateText } from "@/utils/formatter";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { useFetchCart, useDeleteCart } from "@/hooks/useFetchOrder";
import useOrderStore from "@/store/orderStore";
import { useQueryClient } from "@tanstack/react-query";
import SuccessAlertModal from "@/components/SuccessAlertModal";
import { useAuthStore } from "@/store/authStore";
// LoginPromptModal will be removed for the empty cart guest view
import GuestPlaceholderScreen from "@/components/GuestPlaceholderScreen"; // Added
// CartStyleIcon is already imported from @/assets/icons
// router is already imported: import { router } from "expo-router";
// theme is already imported: import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

// Updated CartItem type to include name and id as string
interface CartItem {
  id: string;
  name: string;
  productName: string;
  price: number;
  quantity: number;
  image: any;
  cartSessionId: string;
}

// Updated Section type to include storeId
interface Section {
  storeId: number;
  storeName: string;
  totalPrice: number;
  totalItem: number;
  orderCartProducts: CartItem[];
  expanded: boolean;
}

const CartScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { authToken } = useAuthStore(); // Auth token check first

  // If guest, show placeholder and return early
  if (!authToken) {
    return (
      <GuestPlaceholderScreen
        icon={<CartStyleIcon width={60} height={60} color={theme.colors.primary} />}
        messageTitle="Your Cart Awaits"
        messageBody="Log in or sign up to add items to your cart and proceed to checkout."
        buttonText="Login / Sign Up"
        onButtonPress={() => router.push('/(auth)/signinScreen')}
        containerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: insets.top, backgroundColor: theme.colors.background }}
      />
    );
  }

  // Hooks and state for logged-in users
  const { cartSessionId } = useOrderStore();
  const { data, isLoading, error } = useFetchCart(cartSessionId); // This hook will only run if authToken is present due to the early return above.
  const queryClient = useQueryClient();
  const [isDeleteItemModal, setDeleteItemModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [isSuccessModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { mutate: deleteCartItem } = useDeleteCart((message) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
  });

  useEffect(() => {
    if (data && data.data) {
      setSections(data.data.orderCartStore || []);
      setTotalQuantity(data.data.countCartQuantity);
      calculateTotalQuantity(data.data.orderCartStore || []);
    }
  }, [data]);

  const calculateTotalQuantity = (sections: Section[]) => {
    const total = sections.reduce(
      (acc, section) =>
        acc +
        section.orderCartProducts.reduce((sum, item) => sum + item.quantity, 0),
      0
    );
    setTotalQuantity(total);
  };

  const closeDeleteItemModal = () => {
    setDeleteItemModal(false);
    setSelectedItem(null);
  };

  // Handle opening the delete confirmation modal
  const handleDeleteConfirmation = (item: CartItem) => {
    setSelectedItem(item);
    setDeleteItemModal(true);
  };

  // Handle deleting an item
  const handleDelete = () => {
    if (selectedItem) {
      deleteCartItem(selectedItem.cartId, {
        onSuccess: () => {
          setSections((prevSections) =>
            prevSections
              .map((section) => {
                const updatedProducts = section.orderCartProducts.filter(
                  (item) => item.id !== selectedItem.id
                );
                return {
                  ...section,
                  orderCartProducts: updatedProducts,
                  totalItem: updatedProducts.length,
                  totalPrice: updatedProducts.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  ),
                };
              })
              .filter((section) => section.totalItem > 0)
          );
          closeDeleteItemModal();
          queryClient.invalidateQueries(["cart"]);
        },
      });
    }
  };

  // Handle quantity change
  const handleQuantityChange = (id: string, action: string) => {
    setSections((prevSections) =>
      prevSections
        .map((section) => {
          const updatedProducts = section.orderCartProducts.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    action === "increment"
                      ? item.quantity + 1
                      : Math.max(1, item.quantity - 1),
                }
              : item
          );
          return {
            ...section,
            orderCartProducts: updatedProducts,
            totalPrice: updatedProducts.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          };
        })
        .filter((section) => section.totalItem > 0)
    );
    queryClient.invalidateQueries("cart");
  };

  // Toggle section expansion - implement accordion behavior
  const toggleSectionExpanded = (sectionIndex: number) => {
    if (sections[sectionIndex].expanded) {
      // If clicking on already expanded section, just collapse it
      setSections((prev) =>
        prev.map((section, index) => ({
          ...section,
          expanded: false,
        }))
      );
    } else {
      // Expand the clicked section, collapse all others
      setSections((prev) =>
        prev.map((section, index) => ({
          ...section,
          expanded: index === sectionIndex,
        }))
      );
      setExpandedSectionIndex(sectionIndex);
    }
  };

  // Render a section header
  const renderSectionHeader = ({
    section,
    index,
  }: {
    section: Section;
    index: number;
  }) => (
    <View style={styles.sectionHeader}>
      <View style={styles.storeInfoContainer}>
        <JaraText size={16} weight="500" color={theme.colors.black_80}>
          {truncateText(section.storeName)}
        </JaraText>
        <JaraText size={14} weight="400" color={theme.colors.grey600}>
          {section.totalItem} items
        </JaraText>
      </View>
      <TouchableOpacity onPress={() => toggleSectionExpanded(index)}>
        {section.expanded ? (
          <ChevronUpIcon width={20} height={20} color={theme.colors.black_80} />
        ) : (
          <ChevronDownIcon
            width={20}
            height={20}
            color={theme.colors.black_80}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  // Render store footer with total and checkout button
  const renderStoreFooter = ({ section }: { section: Section }) => (
    <View style={styles.storeFooter}>
      <View style={styles.totalPriceContainer}>
        <JaraText size={14} weight="500" color={theme.colors.grey600}>
          Total price
        </JaraText>
        <MaskedView
          style={styles.maskedView}
          maskElement={
            <JaraText type="Regular" family="Aquire" style={styles.totalPrice}>
              ₦{section.totalPrice.toLocaleString()}
            </JaraText>
          }
        >
          <LinearGradient
            colors={["#FF7508", "#1A2610"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <JaraText style={{ opacity: 0 }}>
              ₦{section.totalPrice.toLocaleString()}
            </JaraText>
          </LinearGradient>
        </MaskedView>
      </View>
      <CustomButton
        title="Checkout"
        type="linearGradient"
        rightIcon={<DiagonalArrowUp />}
        onPress={() =>
          router.push({
            pathname: "/checkoutScreen",
            params: {
              cartItems: JSON.stringify(section.orderCartProducts),
              store: section.storeName,
              storeId: section.storeId,
            },
          })
        }
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <JaraText>Error loading cart items</JaraText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader
        centerComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CartStyleIcon />
            <JaraText>My Cart</JaraText>
          </View>
        }
        rightComponent={<SearchGreyIcon />}
        containerStyle={{ backgroundColor: "transparent" }}
      />
      <View style={styles.cartQuantityHeader}>
        <JaraText size={16} weight="500" color={theme.colors.black_80}>
          Cart Quantity
        </JaraText>
        <JaraText
          size={16}
          weight="600"
          color={theme.colors.foundation_pumpkin_normal}
        >
          {" "}
          {totalQuantity} Items
        </JaraText>
      </View>

      {sections.length > 0 ? (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.storeId.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.sectionContainer}>
              {renderSectionHeader({ section: item, index })}

              {/* Show items only when section is expanded */}
              {item.expanded && item.orderCartProducts && (
                <View style={styles.sectionItemsContainer}>
                  {item.orderCartProducts.map((cartItem) => (
                    <CartItemCard
                      key={cartItem.id}
                      item={cartItem}
                      onDelete={handleDeleteConfirmation}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </View>
              )}

              {/* Always show footer with total and checkout button */}
              {renderStoreFooter({ section: item })}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        // Logged-in user with empty cart
        <View style={styles.emptyCartContainer}>
          <>
            <Image source={require("@/assets/images/PersonShopping.png")} />
            <View style={styles.emptyCartMessage}>
                <JaraText
                  size={20}
                  weight="700"
                  align="center"
                  style={{ textTransform: "capitalize", marginBottom: 16 }}
                >
                  your cart is empty
                </JaraText>
                <JaraText
                  size={14}
                  weight="400"
                  align="center"
                  lineHeight={22.4}
                  color={theme.colors.black_21}
                >
                  Discover exciting products in our various categories. Add them to
                  your cart and start shopping.
                </JaraText>
              </View>
              <CustomButton
                style={{ marginTop: 50 }}
                type="linearGradient"
                title="Explore Product Categories"
                onPress={() => router.replace("/(tabs)/categoriesScreen")}
              />
            </>
          )}
        </View>
      )}

      {/* delete item confirmation modal */}
      <JaraModal
        isVisible={isDeleteItemModal}
        onClose={closeDeleteItemModal}
        initialSnapPoint="40%"
        maxSnapPoint="50%"
        containerStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        {selectedItem && (
          <>
            <JaraText
              size={18}
              weight="600"
              align="center"
              style={{ marginBottom: 16 }}
            >
              Remove Item From Cart?
            </JaraText>
            <View style={styles.deleteModalItemContainer}>
              <CartItemCard
                item={selectedItem}
                onDelete={handleDelete}
                onQuantityChange={handleQuantityChange}
              />
            </View>
            <View style={styles.deleteModalButtonsContainer}>
              <CustomButton
                title="Cancel"
                type="transparent"
                onPress={closeDeleteItemModal}
                style={{
                  backgroundColor: theme.colors.foundation_pumpkin_light,
                  width: width / 2 - 20,
                }}
                titleStyle={{ color: theme.colors.foundation_pumpkin_normal }}
              />
              <CustomButton
                title="Remove"
                type="linearGradient"
                onPress={handleDelete}
                style={{ width: width / 2 - 20 }}
              />
            </View>
          </>
        )}
      </JaraModal>
      <SuccessAlertModal
        visible={isSuccessModalVisible}
        title="Success"
        description={successMessage}
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
  cartQuantityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black_10,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.foundation_white_light_hover,
  },
  sectionItemsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.foundation_white_light_hover,
  },
  storeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  storeFooter: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPriceContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    alignContent: "center",
  },
  maskedView: {
    flex: 1,
    justifyContent: "center",
    width: 150,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.black,
    letterSpacing: 0.2,
    marginTop: 8,
  },
  emptyCartContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyCartMessage: {
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 60,
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
  },
  deleteModalItemContainer: {
    paddingVertical: 24,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  deleteModalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 24,
  },
});

export default CartScreen;
