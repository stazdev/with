import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CustomHeader,
  JaraText,
  CustomButton,
  CollapsibleSection,
  SectionTitle,
  SuccessAlertModal,
} from "@/components";
import {
  ChevronGreyLeftIcon,
  HeartFilledIcon,
  PlusFilledIcon,
  MinusIcon,
  ShareIcon,
} from "@/assets/icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Ionicons } from "@expo/vector-icons";
import ProductHorizontalList from "./ProductHorizontalList";
import { useAddToCart } from "@/hooks/useFetchOrder";
import useOrderStore from "@/store/orderStore";
import { useFetchProductDetails } from "@/hooks/useFetchProduct";

const ProductDetails: React.FC = () => {
  const { id } = useLocalSearchParams(); // Retrieve the parameters
  const productId = Number(id);
  const { data, isLoading, error } = useFetchProductDetails(productId);
  const insets = useSafeAreaInsets();
  const { cartSessionId, setCartSessionId } = useOrderStore();
  const [quantity, setQuantity] = useState(1);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { mutate: addToCart } = useAddToCart((message: string) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
  });

  // State for the selected image
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.foundation_white_light_hover,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return <Text>Error loading product details</Text>;
  }

  const product = data?.data;

  const productGallery =
    product?.productImages?.map((image, index) => ({
      id: index.toString(),
      image: image.imageUrl,
    })) || [];

  const renderGalleryItem = ({
    item,
  }: {
    item: { id: string; image: string };
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedImageId(item.id)}
      style={[
        styles.galleryImageWrapper,
        selectedImageId === item.id && styles.selectedGalleryImage,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.galleryImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const handleAddToCart = () => {
    if (!cartSessionId) {
      setCartSessionId();
    }
    addToCart({
      cartSessionId, // Use the generated cart session ID
      productId: product.id,
      quantity,
      price: product.unitPrice,
    });
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader
        title={"Product Details"}
        leftComponent={<ChevronGreyLeftIcon />}
        rightComponent={<HeartFilledIcon />}
        onLeftPress={() => router.back()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.productImageWrapper}>
          <Image
            source={{
              uri: selectedImageId
                ? productGallery.find((img) => img.id === selectedImageId)
                    ?.image
                : product?.productImages?.[0]?.imageUrl,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Gallery */}
        <FlatList
          data={productGallery}
          horizontal
          renderItem={renderGalleryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.galleryContainer}
        />

        {/* Product Details */}
        <View style={styles.detailsWrapper}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <JaraText
              size={24}
              weight="700"
              lineHeight={33.6}
              style={styles.productTitle}
            >
              {product?.name}
            </JaraText>
            <TouchableOpacity>
              <ShareIcon />
            </TouchableOpacity>
          </View>
          {/* Rating & Store */}
          <View style={styles.ratingStoreWrapper}>
            <View style={styles.ratingWrapper}>
              <Ionicons name={"star"} size={16} color="#A2845E" />
              <JaraText
                size={16}
                weight="500"
                style={styles.ratingText}
                color={theme.colors.neutral_dark_grey}
              >
                <JaraText
                  color={theme.colors.black}
                  children={product?.productReviewDetails?.maxRating}
                />{" "}
                ({product?.productReviewDetails?.totalReview} Reviews)
              </JaraText>
            </View>
            <JaraText
              size={14}
              weight="400"
              color={theme.colors.black_80}
              style={{ letterSpacing: -0.16 }}
            >
              {product?.storeName}
            </JaraText>
          </View>

          {/* Price & Quantity */}
          <View style={styles.priceQuantityWrapper}>
            <MaskedView
              maskElement={
                <JaraText type="Regular" family="Aquire" style={styles.price}>
                  ₦{product?.unitPrice.toLocaleString()}
                </JaraText>
              }
            >
              <LinearGradient
                colors={["#FF7508", "#1A2610"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
              >
                <JaraText type="Regular" family="Aquire" style={{ opacity: 0 }}>
                  ₦{product?.unitPrice.toLocaleString()}
                </JaraText>
              </LinearGradient>
            </MaskedView>
            <View style={styles.quantityWrapper}>
              <TouchableOpacity
                style={styles.minusButton}
                onPress={decrementQuantity}
              >
                <MinusIcon />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={incrementQuantity}
              >
                <PlusFilledIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: theme.colors.foundation_white_light_hover,
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />
          {/* Product Description */}
          <CollapsibleSection
            title={"Product Description"}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.black,
            }}
          >
            <JaraText size={14} weight="400" style={styles.descriptionText}>
              {product?.description}
            </JaraText>
          </CollapsibleSection>
          {/* Product Specification */}
          <CollapsibleSection
            title={"Product Specification"}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.black,
            }}
          >
            {product?.productionSpecifications?.map((spec, index) => (
              <JaraText
                key={index}
                size={14}
                weight="400"
                style={styles.descriptionText}
              >
                {spec.name}: {spec.description}
              </JaraText>
            ))}
          </CollapsibleSection>
          {/* Product Key Features */}
          <CollapsibleSection
            title={"Product Key Features"}
            titleStyle={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.black,
            }}
          >
            <JaraText size={14} weight="400" style={styles.descriptionText}>
              High strength speed 
            </JaraText>
          </CollapsibleSection>
          <View style={{ padding: 20, paddingBottom: 16 }}>
            <SectionTitle title="Similar Products" />
          </View>
          <ProductHorizontalList
            products={[]} // Replace with actual similar products data if available
            onProductPress={function (id: string): void {
              throw new Error("Function not implemented.");
            }}
          />

          {/* Action Buttons */}
          <View style={styles.actionButtonsWrapper}>
            <CustomButton
              type="outline"
              title="Add To Cart"
              onPress={handleAddToCart}
              style={{
                backgroundColor: theme.colors.foundation_scarlet_light_hover,
                borderColor: theme.colors.foundation_scarlet_light_hover,
              }}
            />
            <CustomButton
              type="linearGradient"
              title="Buy Now"
              onPress={() => console.log("Buy Now")}
            />
          </View>
        </View>
      </ScrollView>
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

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  productImageWrapper: {
    alignItems: "center",
    // marginVertical: 16,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  galleryContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  galleryImageWrapper: {
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 3,
    backgroundColor: theme.colors.white,
  },
  selectedGalleryImage: {
    borderWidth: 1,
    borderColor: theme.colors.foundation_pumpkin_normal,
  },
  galleryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  detailsWrapper: {
    flex: 1,
    paddingVertical: 24,
    marginTop: 40,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  productTitle: {
    marginBottom: 8,
  },
  ratingStoreWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
  },

  priceQuantityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  gradientBackground: {
    width: 200,
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
  },
  quantityWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.foundation_white_light_hover,
    borderRadius: 100,
    padding: 1,
  },
  minusButton: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  plusButton: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: theme.colors.white,
  },
  descriptionWrapper: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  descriptionText: {
    color: theme.colors.black_70,
    paddingHorizontal: 20,
  },
  actionButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 80,
  },
});
