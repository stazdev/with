import React, { useState, useEffect, useRef, useCallback } from "react"; // Added useEffect, useRef, useCallback
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions, // Added Dimensions
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
// useState is already imported: import React, { useState, useEffect, useRef, useCallback } from "react";

const windowWidth = Dimensions.get('window').width;
const mainImageHeight = 250; // Or your desired height
const mainImageWidth = windowWidth * 0.8; // Example: 80% of screen width for the carousel item

const ProductDetails: React.FC = () => {
  const { id } = useLocalSearchParams(); // Retrieve the parameters
  const productId = Number(id);
  const { data, isLoading, error } = useFetchProductDetails(productId);
  const insets = useSafeAreaInsets();
  const { cartSessionId, setCartSessionId } = useOrderStore();
  const { authToken } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginPromptForCart, setShowLoginPromptForCart] = useState(false);
  const [showLoginPromptForFavorite, setShowLoginPromptForFavorite] = useState(false);
  const [isFavoriteStatusModalVisible, setIsFavoriteStatusModalVisible] = useState(false);
  const [favoriteStatusTitle, setFavoriteStatusTitle] = useState("");
  const [favoriteStatusMessage, setFavoriteStatusMessage] = useState("");

  const [currentMainImageIndex, setCurrentMainImageIndex] = useState(0); // Added for carousel
  const mainImageCarouselRef = useRef<FlatList | null>(null); // Added for carousel

  const { mutate: addToCart } = useAddToCart((message: string) => {
    setSuccessMessage(message);
    setSuccessModalVisible(true);
  });

  // State for the selected image (from thumbnail clicks)
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

  const product = data?.data;

  const productGallery =
    product?.productImages?.map((image, index) => ({
      id: index.toString(), // Ensure unique ID for keyExtractor
      image: image.imageUrl,
    })) || [];

  // Auto-scroll for main image carousel
  useEffect(() => {
    if (productGallery && productGallery.length > 1) {
      const interval = setInterval(() => {
        setCurrentMainImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % productGallery.length;
          mainImageCarouselRef.current?.scrollToIndex({
            animated: true,
            index: nextIndex,
          });
          return nextIndex;
        });
      }, 3000); // Scroll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [productGallery]);
  
  // Thumbnail click handler - might be adjusted later to sync with carousel index
  const handleThumbnailPress = (imageId: string, index: number) => {
    setSelectedImageId(imageId);
    mainImageCarouselRef.current?.scrollToIndex({ animated: true, index });
    setCurrentMainImageIndex(index); // Sync carousel index
  };
  
  const renderGalleryItem = ({ item, index }: { item: { id: string; image: string }; index: number }) => (
    <TouchableOpacity
      onPress={() => handleThumbnailPress(item.id, index)}
      style={[
        styles.galleryImageWrapper,
        // Highlight based on carousel index OR selectedImageId if you want to keep that logic
        currentMainImageIndex === index && styles.selectedGalleryImage, 
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.galleryImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  
  const renderMainImageItem = ({ item }: { item: { id: string; image: string } }) => (
    <View style={styles.mainImageSlide}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage} // Ensure this style has width and height
        resizeMode="contain"
      />
    </View>
  );


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
        {/* Main Product Image Carousel */}
        <View style={styles.productImageWrapper}>
          {productGallery.length > 0 ? (
            <FlatList
              ref={mainImageCarouselRef}
              data={productGallery}
              renderItem={renderMainImageItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              style={styles.mainImageCarousel}
              onMomentumScrollEnd={(event) => { // Update index on manual scroll
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / mainImageWidth);
                if(newIndex !== currentMainImageIndex && newIndex >=0 && newIndex < productGallery.length) {
                    setCurrentMainImageIndex(newIndex);
                    setSelectedImageId(productGallery[newIndex].id); // Sync selectedId if needed
                }
              }}
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]}>
              <JaraText>No Image</JaraText>
            </View>
          )}
        </View>

        {/* Product Gallery Thumbnails */}
        {productGallery.length > 1 && ( // Only show thumbnails if more than one image
            <FlatList
                data={productGallery}
                horizontal
                renderItem={renderGalleryItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.galleryContainer}
                showsHorizontalScrollIndicator={false}
            />
        )}

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
    marginVertical: 16, // Keep or adjust as needed
    height: mainImageHeight, // Set a fixed height for the carousel wrapper
  },
  mainImageCarousel: {
    height: mainImageHeight,
  },
  mainImageSlide: {
    width: mainImageWidth, // Each slide takes the defined width
    height: mainImageHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: { // Style for the image inside the carousel slide
    width: '100%', // Take full width of the slide
    height: '100%', // Take full height of the slide
  },
  placeholderImage: {
    width: mainImageWidth,
    height: mainImageHeight,
    backgroundColor: theme.colors.neutral_light_grey,
    justifyContent: 'center',
    alignItems: 'center',
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
