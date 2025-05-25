import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { JaraText, Search, SectionTitle } from "@/components";
import { NotFound, SearchGreyIcon } from "@/assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProductCategory from "./(product)/ProductCategory";
import ProductList from "./(product)/ProductList";
import { theme } from "@/constants/theme";

const productCategories = [
  { id: "1", name: "Appliances" },
  { id: "2", name: "Phones" },
  { id: "3", name: "Health" },
  { id: "4", name: "Home" },
  { id: "5", name: "Electronics" },
  { id: "6", name: "Fashion" },
  { id: "7", name: "Supermarket" },
];

const allProducts = [
  {
    id: "1",
    name: "Hisense Smart TV",
    descr: "46 Inches",
    price: "145,000",
    discount: "25",
    image: require("@/assets/images/tv.png"),
  },
  {
    id: "2",
    name: "Electric Cooker",
    descr: "Multi-function",
    price: "95,000",
    discount: "20",
    image: require("@/assets/images/product2.png"),
  },
  {
    id: "3",
    name: "Hisense Smart TV",
    descr: "46 Inches",
    price: "145,000",
    discount: "25",
    image: require("@/assets/images/tv.png"),
  },
  {
    id: "4",
    name: "Electric Cooker",
    descr: "Multi-function",
    price: "95,000",
    discount: "20",
    image: require("@/assets/images/product2.png"),
  },
];

const NoResultsFound: React.FC<{ keyword: string }> = ({ keyword }) => (
  <View style={styles.noResultContainer}>
    <JaraText
      size={18}
      weight="600"
      color={theme.colors.black}
      style={{ letterSpacing: -0.18, marginTop: 24, marginBottom: 80 }}
      align="left"
    >
      No result found for{" "}
      <JaraText size={18} weight="600" color={theme.colors.primary}>
        {keyword}
      </JaraText>
    </JaraText>
    <View style={{ alignSelf: "center" }}>
      <NotFound />
    </View>

    <JaraText
      size={24}
      weight="700"
      color={theme.colors.black}
      lineHeight={28.8}
      style={{ marginBottom: 12, marginTop: 80 }}
      align="center"
    >
      Not Found
    </JaraText>
    <JaraText
      size={18}
      weight="400"
      color={theme.colors.black_70}
      align="center"
    >
      Sorry, the keyword you entered cannot be found, please check again or
      search with another keyword.
    </JaraText>
  </View>
);

const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { keyword = "" } = useLocalSearchParams(); // Retrieve the keyword parameter
  const [searchResults, setSearchResults] = useState([]);

  const closeProductSearchModal = () => {
    router.back();
  };

  // Filter products based on keyword
  useEffect(() => {
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
  }, [keyword]);

  // Handle search input submission
  const handleSearchSubmit = (searchKeyword: string) => {
    if (searchKeyword) {
      router.push(`/searchScreen?keyword=${encodeURIComponent(searchKeyword)}`);
      closeProductSearchModal();
    }
  };

  const handleProductPress = (id: string) => {
    console.log("Selected product ID:", id);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <Search
          variant="outlined"
          leftIcon={<SearchGreyIcon />}
          rightItem={
            <JaraText
              children={"Cancel"}
              size={14}
              weight="400"
              lineHeight={21}
            />
          }
          rightItemPress={closeProductSearchModal}
          onSubmitEditing={(event) =>
            handleSearchSubmit(event.nativeEvent.text)
          } // Add the search submit handler
        />
      </View>
      {searchResults.length > 0 ? (
        <>
          <ProductCategory
            categories={productCategories}
            onProductPress={handleProductPress}
            onFilterPress={() => console.log("Filter button clicked")}
          />
          <View style={{ marginHorizontal: 20 }}>
            <SectionTitle title="Search Result" />
          </View>
          <ProductList
            viewAll={false}
            products={searchResults}
            onProductPress={handleProductPress}
          />
        </>
      ) : (
        <NoResultsFound keyword={keyword} />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  noResultContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  noResultText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
});
