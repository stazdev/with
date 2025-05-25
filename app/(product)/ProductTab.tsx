import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ClockIcon, LighteningIcon } from "@/assets/icons";
import SectionTitle from "@/components/SectionTitle";
import CategoryList from "@/components/CategoryList";
import CollapsibleSection from "../../components/CollapsibleSection";
import { theme } from "@/constants/theme";
import ProductList from "./ProductList";
import { SuccessAlertModal, TopRatedStore } from "@/components";
import {
  useFetchProductCategories,
  useFetchProductsByCategory,
  useAddToFavorite,
  useFetchFavoriteFolders,
  useFetchRecommendedProducts,
  useRemoveFromFavorite,
} from "@/hooks/useFetchProduct";
import SelectFolderModal from "@/components/SelectFolderModal";

const { width } = Dimensions.get("window");
interface ProductTabProps {
  rightIconPress?: () => void;
}
const ProductTab: React.FC<ProductTabProps> = () => {
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useFetchProductCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useFetchProductsByCategory(selectedCategoryId || 0);
  const [secondsLeft, setSecondsLeft] = useState(10); // Timer state

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);

  const { data: foldersData } = useFetchFavoriteFolders();
  const addToFavorite = useAddToFavorite();
  const removeFromFavorite = useRemoveFromFavorite();
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: recommendedData,
    isLoading: isLoadingRecommended,
    error: recommendedError,
  } = useFetchRecommendedProducts();

  const handleFavoritePress = async (product: any) => {
    setSelectedProduct(product);
    if (product.isFavorite) {
      console.log("Removing from favorites:", product.id);
      try {
        await removeFromFavorite.mutateAsync({
          productId: product.id,
        });
        setSuccessMessage("Product removed from favorites successfully.");
        setSuccessModalVisible(true);
      } catch (error) {
        console.error("Failed to remove from favorites:", error);
        // Handle error appropriately
      }
    } else {
      setIsFolderModalVisible(true);
    }
  };

  const handleSelectFolder = async (folderId: number) => {
    try {
      await addToFavorite.mutateAsync({
        folderId,
        productId: selectedProduct.id,
      });
      setSuccessMessage("Product added to favorites successfully.");
      setIsFolderModalVisible(false);
      setSuccessModalVisible(true);
      // Update the product's isFavorite property in the state
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        isFavorite: true,
      }));
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      // Handle error appropriately
    }
  };

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev === 0 ? 180 : prev - 1)); // Reset to 10 after 0
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleCategoryPress = (id: string) => {
    setSelectedCategoryId(Number(id));
  };

  const handleProductPress = (id: string) => {
    console.log("Selected product ID:", id);
  };

  if (isLoadingCategories) {
    return <Text>Loading categories...</Text>;
  }

  if (categoriesError) {
    return <Text>Error loading categories</Text>;
  }

  return (
    <View style={{ marginBottom: 50 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/herobg.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Section Title for Categories */}
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <SectionTitle title="Product Categories" />
      </View>

      {/* Horizontal FlatList for Categories */}
      <CategoryList
        categories={categoriesData?.data || []}
        onCategoryPress={handleCategoryPress}
      />

      {isLoadingProducts ? (
        <ActivityIndicator color={theme.colors.primary} size={"large"} />
      ) : productsError ? (
        <Text>Error loading products</Text>
      ) : (
        <ProductList
          products={productsData?.data || []}
          onProductPress={handleProductPress}
          onFavoritePress={handleFavoritePress}
        />
      )}

      <CollapsibleSection title={"Recommended For You"}>
        {isLoadingRecommended ? (
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        ) : recommendedError ? (
          <Text>Error loading recommended products</Text>
        ) : (
          <ProductList
            products={recommendedData?.data || []}
            onProductPress={handleProductPress}
            onFavoritePress={handleFavoritePress}
          />
        )}
      </CollapsibleSection>

      {/* Flash Sales Section with Timer */}
      {/* <CollapsibleSection
        title={"Flash Sales"}
        leftIcon={<LighteningIcon />}
        rightIcon={
          <View style={styles.timerContainer}>
            <ClockIcon />
            <JaraText
              size={12}
              weight="600"
              color={theme.colors.foundation_purple_normal}
              style={styles.timerText}
            >
              {secondsLeft}s
            </JaraText>
          </View>
        }
      >
        <ProductList
          products={productsData?.data || []}
          onProductPress={handleProductPress}
        />
      </CollapsibleSection> */}

      <TopRatedStore />

      <CollapsibleSection title={"Trending Products"}>
        <ProductList
          products={productsData?.data || []}
          onProductPress={handleProductPress}
        />
      </CollapsibleSection>

      <SelectFolderModal
        visible={isFolderModalVisible}
        onClose={() => setIsFolderModalVisible(false)}
        folders={foldersData?.data || []}
        onSelectFolder={handleSelectFolder}
        productName={selectedProduct?.name || ""}
      />

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

export default ProductTab;

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 16,
  },
  image: {
    width: "100%",
  },

  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginLeft: 4,
  },
});
