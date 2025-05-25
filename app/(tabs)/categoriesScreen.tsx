import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { theme } from "@/constants/theme";
import {
  Carousel,
  CustomHeader,
  JaraText,
  SectionTitle,
  JaraModal,
} from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchGreyIcon } from "@/assets/icons";
import ProductCategory from "../(product)/ProductCategory";
import ProductList from "../(product)/ProductList";
import { router } from "expo-router";
import FilterContent from "@/components/FilterContent"; // Component to hold the filter UI
import {
  useFetchProductCategories,
  useFetchProductsByCategory,
} from "@/hooks/useFetchProduct";

const banners = [
  { id: 1, title: "45% Off Groceries", backgroundColor: "#f39c12" },
  { id: 2, title: "New Arrivals", backgroundColor: "#3498db" },
  { id: 3, title: "Flash Sales", backgroundColor: "#27ae60" },
];

const CategoriesScreen = () => {
  const insets = useSafeAreaInsets();

  // State for selected category and modal visibility
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Products");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Fetch product categories
  const {
    data: productCategoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useFetchProductCategories();

  // Fetch products by selected category
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useFetchProductsByCategory(categoryId || 1);

  // Handler for selecting a product category
  const handleProductPress = (id: string) => {
    const category = productCategoriesData?.data.find((item) => item.id === id);
    if (category) {
      setSelectedCategory(category.name);
      setCategoryId(category.id);
    }
  };

  // Toggle the modal visibility
  const handleFilterPress = () => {
    setFilterVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader
        title="Product Categories"
        rightComponent={<SearchGreyIcon />}
        containerStyle={{ backgroundColor: "transparent" }}
        onRightPress={() => router.push("/searchScreen")}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Carousel banners={banners} />
        {isLoadingCategories ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : categoriesError ? (
          <JaraText>Error loading categories</JaraText>
        ) : (
          <ProductCategory
            categories={productCategoriesData?.data || []}
            onProductPress={handleProductPress}
            onFilterPress={handleFilterPress} // Open modal on filter press
          />
        )}
        <SectionTitle
          title={`Recommended ${
            selectedCategory === "All Products" ? "Products" : selectedCategory
          } for you`}
          style={{ paddingLeft: 20 }}
          titleStyle={{ fontWeight: "600", letterSpacing: -0.18 }}
        />
        {isLoadingProducts ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : productsError ? (
          <JaraText>Error loading products</JaraText>
        ) : productsData?.data.length === 0 ? (
          <View style={styles.emptyCategoryContainer}>
            <JaraText size={16} weight="500" color={theme.colors.black_80}>
              No products available in this category.
            </JaraText>
          </View>
        ) : (
          <ProductList
            products={productsData?.data || []}
            onProductPress={(id: string) => {
              console.log("Product Pressed ID:", id);
            }}
            onFavoritePress={(product) => {
              console.log("Favorite Pressed:", product);
            }}
          />
        )}
      </ScrollView>

      {/* Filter Modal */}
      <JaraModal
        isVisible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        scrollable={true}
        initialSnapPoint="50%"
        maxSnapPoint="70%"
      >
        <FilterContent />
      </JaraModal>
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  scrollContent: {
    paddingBottom: 20, // Adds some space at the bottom for a smooth scroll experience
  },
  emptyCategoryContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
