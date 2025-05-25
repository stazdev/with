import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronRightIcon,
  HeartActiveIcon,
  HeartIcon,
  PlusIcon,
} from "@/assets/icons";
import { JaraText } from "@/components";
import { theme } from "@/constants/theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router"; // Import the router for navigation
import { Product } from "@/interfaces/product";
import { truncateText } from "@/utils/formatter";
import { useAddToCart } from "@/hooks/useFetchOrder";
import useOrderStore from "@/store/orderStore";
import SuccessAlertModal from "@/components/SuccessAlertModal";

const { width } = Dimensions.get("window");

interface ProductListProps {
  products: Product[];
  onProductPress: (id: number) => void;
  onFavoritePress: (product: Product) => void;
  viewAll?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductPress,
  onFavoritePress,
  viewAll = true,
}) => {
  const { cartSessionId, setCartSessionId } = useOrderStore();
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { mutate: addToCart } = useAddToCart((message: string) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
  });

  const handleProductPress = (product: Product) => {
    // Navigate to ProductDetailScreen and pass the product details as parameters
    router.push({
      pathname: "/(product)/productDetails",
      params: {
        id: product.id,
      },
    });
  };

  const handleAddToCart = (product: Product) => {
    if (!cartSessionId) {
      setCartSessionId();
    }
    addToCart({
      cartSessionId, // Use the generated cart session ID
      productId: product.id,
      quantity: 1,
      price: product.unitPrice,
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)} // Updated to pass product details
      activeOpacity={0.9}
    >
      {/* Discount Badge with Linear Gradient */}
      <LinearGradient
        colors={["#1A2610", "#FF7508"]}
        start={{ x: -0.05, y: 0 }}
        end={{ x: 0.92, y: 1 }}
        style={styles.discountBadge}
      >
        <Text style={styles.discountText}>{item.discountPercentage}%</Text>
      </LinearGradient>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onFavoritePress(item)}
      >
        {item.isFavorite ? <HeartActiveIcon /> : <HeartIcon />}
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.plus}
        onPress={() => handleAddToCart(item)}
      >
        <PlusIcon />
      </TouchableOpacity>

      <Image
        source={{ uri: item.productImages }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={{ marginLeft: 10, marginBottom: 10 }}>
        <JaraText
          size={16}
          weight="600"
          color={theme.colors.black_80}
          style={[styles.productName]}
        >
          {truncateText(item.name, 10)}
        </JaraText>
        <JaraText
          size={12}
          weight="500"
          color={theme.colors.black_21}
          style={styles.productDescr}
        >
          {truncateText(item.description, 10)}
        </JaraText>

        <View style={styles.priceContainer}>
          <MaskedView
            maskElement={
              <Text style={[styles.price, { fontFamily: "Aquire" }]}>
                ₦{item.unitPrice.toLocaleString()}
              </Text>
            }
          >
            <LinearGradient
              colors={["#FF7508", "#1A2610"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <Text style={{ opacity: 0, fontFamily: "Aquire" }}>
                ₦{item.unitPrice.toLocaleString()}
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={products.filter(Boolean)} // Filter out any undefined values
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      {viewAll && (
        <TouchableOpacity activeOpacity={0.7} style={styles.viewAll}>
          <JaraText
            children={"View All"}
            size={14}
            weight="600"
            color={theme.colors.foundation_green_normal}
          />
          <ChevronRightIcon />
        </TouchableOpacity>
      )}
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
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  productCard: {
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    width: width / 2 - 24,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 0,
    zIndex: 1,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  heart: {
    position: "absolute",
    bottom: 100,
    right: 5,
    padding: 4,
    borderRadius: 12,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
  productImage: {
    width: "100%",
    height: 104,
    marginBottom: 9,
  },
  productName: {
    marginBottom: 4,
  },
  productDescr: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: "flex-start", // Align left to prevent overflow
  },
  gradientBackground: {
    width: 100,
    paddingHorizontal: 6,
    paddingBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  plus: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderTopRightRadius: 0,
    zIndex: 1,
    backgroundColor: theme.colors.foundation_green_normal,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 100,
    right: 5,
    padding: 4,
    borderRadius: 12,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
});

export default ProductList;
