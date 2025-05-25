import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { JaraText } from "@/components";
import { JaraTag, TrashIcon } from "@/assets/icons";
import { theme } from "@/constants/theme";
import { truncateText } from "@/utils/formatter";
import { useUpdateCart } from "@/hooks/useFetchOrder";

type CartItemCardProps = {
  item: {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    image: any;
    cartId: number;
  };
  onDelete: (item: any) => void;
  onQuantityChange?: ((id: string, action: string) => void) | undefined;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onDelete,
  onQuantityChange,
}) => {
  const { mutate: updateCart } = useUpdateCart((message) => {
    console.log(message);
  });

  const handleQuantityChange = (id: string, action: string) => {
    console.log("here888");
    const newQuantity =
      action === "increment"
        ? item.quantity + 1
        : Math.max(1, item.quantity - 1);
    updateCart({
      cartId: item.cartId,
      quantity: newQuantity,
      price: item.price,
    });
    if (onQuantityChange) {
      onQuantityChange(id, action);
    }
  };

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productDetails}>
        <View style={styles.productHeader}>
          <JaraText size={18} weight="700" lineHeight={21.6}>
            {truncateText(item.productName, 18)}
          </JaraText>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <TrashIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.tagContainer}>
          <JaraTag />
          <JaraText size={12} weight="500" color={theme.colors.gery1}>
            Withjara tag
          </JaraText>
        </View>
        <View style={styles.priceQuantityContainer}>
          <JaraText type="Regular" family="Aquire" style={styles.productPrice}>
            ₦{item.price.toLocaleString()}
          </JaraText>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, "decrement")}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, "increment")}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 14,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.foundation_grey_darker,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 7,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productPrice: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.silver,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityButton: {},
  quantityText: {
    marginHorizontal: 8,
    fontWeight: "bold",
  },
});
