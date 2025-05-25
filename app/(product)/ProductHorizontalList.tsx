import React from "react";
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
import { ChevronRightIcon, HeartIcon, PlusIcon } from "@/assets/icons";
import { JaraText } from "@/components";
import { theme } from "@/constants/theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router"; // Import the router for navigation

const { width } = Dimensions.get("window");

interface Product {
  id: string;
  name: string;
  descr: string;
  price: string;
  discount: string;
  image: any;
  store: string;
  avgRating: number;
  ratingCount: number;
}

interface ProductHorizontalProps {
  products: Product[];
  onProductPress: (id: string) => void;
  viewAll?: boolean;
}

const ProductHorizontalList: React.FC<ProductHorizontalProps> = ({
  products,
  onProductPress,
  viewAll = true,
}) => {
  const handleProductPress = (product: Product) => {
    // Navigate to ProductDetailScreen and pass the product details as parameters
    router.push({
      pathname: "/(product)/productDetails",
      params: {
        id: product.id,
        name: product.name,
        descr: product.descr,
        price: product.price,
        discount: product.discount,
        image: product.image,
        store: product.store,
        avgRating: product.avgRating,
        ratingCount: product.ratingCount,
      },
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
        <Text style={styles.discountText}>{item.discount}%</Text>
      </LinearGradient>

      <TouchableOpacity style={styles.heart}>
        <HeartIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.plus}>
        <PlusIcon />
      </TouchableOpacity>

      <Image
        source={item.image}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={{ marginLeft: 10, marginBottom: 10 }}>
        <JaraText
          size={16}
          weight="600"
          color={theme.colors.black_80}
          style={styles.productName}
        >
          {item.name}
        </JaraText>
        <JaraText
          size={12}
          weight="500"
          color={theme.colors.black_21}
          style={styles.productDescr}
        >
          {item.descr}
        </JaraText>

        <View style={styles.priceContainer}>
          <MaskedView
            maskElement={<Text style={styles.price}>₦{item.price}</Text>}
          >
            <LinearGradient
              colors={["#FF7508", "#1A2610"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <Text style={{ opacity: 0 }}>₦{item.price}</Text>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    // paddingTop: 10,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    width: 180,
    borderColor: theme.colors.black_5,
    borderWidth: 1,
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
    paddingBottom: 6,
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
});

export default ProductHorizontalList;
