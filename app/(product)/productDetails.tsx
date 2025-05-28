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
import { useAuthStore } from "@/store/authStore";
import LoginPromptModal from "@/components/LoginPromptModal";
import { addProductToFavorite, fetchFavoriteFolders } from "@/services/productService"; // Added
// useState is already imported: import React, { useState } from "react";

const ProductDetails: React.FC = () => {
  const { id } = useLocalSearchParams(); // Retrieve the parameters
  const productId = Number(id);
  const { data, isLoading, error } = useFetchProductDetails(productId);
  const insets = useSafeAreaInsets();
  const { cartSessionId, setCartSessionId } = useOrderStore();
  const { authToken } = useAuthStore(); // Added
  const [quantity, setQuantity] = useState(1);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false); // For AddToCart
  const [successMessage, setSuccessMessage] = useState(""); // For AddToCart
  const [showLoginPromptForCart, setShowLoginPromptForCart] = useState(false);
  const [showLoginPromptForFavorite, setShowLoginPromptForFavorite] = useState(false); // Added
  const [isFavoriteStatusModalVisible, setIsFavoriteStatusModalVisible] = useState(false); // Added
  const [favoriteStatusTitle, setFavoriteStatusTitle] = useState(""); // Added
  const [favoriteStatusMessage, setFavoriteStatusMessage] = useState(""); // Added

  const { mutate: addToCart } = useAddToCart((message: string) => {
    setSuccessMessage(message); // This is for the cart success
    setSuccessModalVisible(true);
  });

  // State for the selected image
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);


  const handleAddToFavorites = async () => {
    if (!authToken) {
      setShowLoginPromptForFavorite(true);
      return;
    }
    if (!product) {
      setFavoriteStatusTitle("Error");
      setFavoriteStatusMessage("Product details not available.");
      setIsFavoriteStatusModalVisible(true);
      return;
    }

    try {
      const foldersResponse = await fetchFavoriteFolders();
      if (foldersResponse && foldersResponse.data && foldersResponse.data.length > 0) {
        const firstFolderId = foldersResponse.data[0].id; // Assuming 'id' is the folderId property
        await addProductToFavorite({ productId: product.id, folderId: firstFolderId });
        setFavoriteStatusTitle("Success!");
        setFavoriteStatusMessage("Product added to your favorites in folder: " + foldersResponse.data[0].name);
      } else {
        setFavoriteStatusTitle("No Favorite Folder");
        setFavoriteStatusMessage("Please create a favorite folder first to add items. You can do this from your Favorites screen.");
      }
    } catch (error: any) {
      console.error("Failed to add to favorites:", error);
      setFavoriteStatusTitle("Error");
      setFavoriteStatusMessage(error?.response?.data?.message || "Failed to add product to favorites. Please try again.");
    }
    setIsFavoriteStatusModalVisible(true);
  };


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
    if (!authToken) {
      setShowLoginPromptForCart(true);
      return;
    }
    // Ensure product is defined before proceeding
    if (!product) {
      console.error("Product data is not available.");
      // Optionally, show an error message to the user
      return;
    }
    if (!cartSessionId) {
      setCartSessionId(); // This will generate a new cartSessionId if one doesn't exist
    }
    // The cartSessionId might be generated asynchronously if it was null,
    // but useAddToCart hook or the backend should handle the case where it might still be initializing.
    // For robustness, one might consider awaiting setCartSessionId if it returned a promise,
    // or ensuring cartSessionId is available before calling addToCart.
    // However, based on typical Zustand usage, setCartSessionId usually updates state synchronously.

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
        rightComponent={
          <TouchableOpacity onPress={handleAddToFavorites}>
            <HeartFilledIcon />
          </TouchableOpacity>
        }
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
      <LoginPromptModal
        isVisible={showLoginPromptForCart}
        onClose={() => setShowLoginPromptForCart(false)}
        title="Add to Cart"
        message="Please log in or sign up to add items to your cart."
      />
      <LoginPromptModal
        isVisible={showLoginPromptForFavorite}
        onClose={() => setShowLoginPromptForFavorite(false)}
        title="Add to Favorites"
        message="Please log in or sign up to add items to your favorites."
      />
      <SuccessAlertModal
        visible={isFavoriteStatusModalVisible}
        title={favoriteStatusTitle}
        description={favoriteStatusMessage}
        buttonText="OK"
        onPressButton={() => setIsFavoriteStatusModalVisible(false)}
        onClose={() => setIsFavoriteStatusModalVisible(false)}
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
