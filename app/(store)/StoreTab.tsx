import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import StoreCategoryList from "./StoreCategory";
import {
  JaraText,
  RocommendedStoreCard,
  SectionTitle,
  TopRatedStore,
  VerticalStore,
} from "@/components";
import { theme } from "@/constants/theme";
import {
  useFetchStoreTypes,
  useFetchStoresByType,
  useFetchStoreProducts,
} from "@/hooks/useFetchStore";
import { router } from "expo-router";

const StoreTab = () => {
  const {
    data: storeTypesData,
    isLoading: isLoadingStoreTypes,
    error: errorStoreTypes,
  } = useFetchStoreTypes();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const {
    data: storesData,
    isLoading: isLoadingStores,
    error: errorStores,
  } = useFetchStoresByType(selectedCategoryId || 0);
  const {
    data: storeProductsData,
    isLoading: isLoadingStoreProducts,
    error: errorStoreProducts,
  } = useFetchStoreProducts(5);
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>("A");

  if (isLoadingStoreTypes || isLoadingStores || isLoadingStoreProducts) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (errorStoreTypes || errorStores || errorStoreProducts) {
    console.error(
      "Error loading data:",
      errorStoreTypes || errorStores || errorStoreProducts
    );
    return <JaraText>Error loading data</JaraText>;
  }

  const categories = storeTypesData?.data || [];
  const favoriteStores = storesData?.data || [];
  const suggestedProducts = storeProductsData?.data || [];

  // Generate alphabet array from A-Z
  const alphabets = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(65 + i)
  );

  // Filter favoriteStores based on selected alphabet
  const filteredStores = favoriteStores.filter((store) =>
    store.storeName.toUpperCase().startsWith(selectedAlphabet)
  );

  const handleAlphabetPress = (alphabet: string) => {
    setSelectedAlphabet(alphabet);
  };

  const handleCategoryPress = (id: string) => {
    setSelectedCategoryId(parseInt(id, 10));
  };

  const handleStorePress = (store) => {
    router.push({
      pathname: "/(store)/storeScreen",
      params: {
        id: store.id,
        name: store.storeName,
        followers: `${store.totalFollowers} followers`,
        image: store.coverImage,
        productCount: store.productCount,
        description: store.description,
        tagline: store.tagline,
        avgRating: store.avgRating,
        isFollowing: store.isFollowing,
      },
    });
  };

  return (
    <View>
      <StoreCategoryList
        categories={categories}
        onCategoryPress={handleCategoryPress}
      />

      {/* Featured Store Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <SectionTitle
          title="Featured Store"
          titleStyle={{
            fontSize: 16,
            fontWeight: "700",
            lineHeight: 24.6,
            letterSpacing: 0.4,
          }}
        />
        <View style={styles.favoriteStoresContainer}>
          {favoriteStores.map((favorite) => (
            <View key={favorite.id} style={styles.favoriteItem}>
              <VerticalStore
                image={{ uri: favorite.coverImage }}
                storeName={favorite.storeName}
                onPress={() => handleStorePress(favorite)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Top Rated Stores Section */}
      <TopRatedStore />

      {/* Pagination Section */}
      <View style={styles.paginationContainer}>
        <JaraText
          size={14}
          weight="700"
          color={theme.colors.black_20}
          lineHeight={23.8}
          style={{ letterSpacing: 0.1 }}
        >
          {favoriteStores.length} stores
        </JaraText>
        <FlatList
          data={alphabets}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.alphabetButton,
                selectedAlphabet === item && styles.selectedAlphabetButton,
              ]}
              onPress={() => handleAlphabetPress(item)}
            >
              <JaraText
                size={16}
                weight="500"
                style={
                  selectedAlphabet === item
                    ? styles.selectedAlphabetText
                    : styles.alphabetText
                }
              >
                {item}
              </JaraText>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Filtered Stores */}
      <View style={styles.filteredStoresContainer}>
        {filteredStores.map((store) => (
          <View key={store.id} style={styles.favoriteItem}>
            <VerticalStore
              image={{ uri: store.coverImage }}
              storeName={store.storeName}
              onPress={() => handleStorePress(store)}
            />
          </View>
        ))}
      </View>

      {/* You Might Like Section */}
      <SectionTitle title="You Might Like" titleStyle={{ paddingLeft: 20 }} />
      <View style={styles.suggestedProductsContainer}>
        {suggestedProducts.map((product) => (
          <RocommendedStoreCard
            key={product.id}
            image={{ uri: product.productImages[0].imageUrl }}
            storeName={product.storeName}
            price={product.unitPrice.toString()}
            onPress={() =>
              router.push({
                pathname: "/(product)/productDetails",
                params: {
                  id: product.id,
                },
              })
            }
            name={product.name}
            isFavorite={product.isFavorite}
          />
        ))}
      </View>
    </View>
  );
};

export default StoreTab;

const styles = StyleSheet.create({
  favoriteStoresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  favoriteItem: {
    alignItems: "center",
    marginVertical: 10,
    width: "25%",
    gap: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingVertical: 10,
    gap: 50,
  },
  alphabetButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 50,
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: theme.colors.grey300,
  },
  selectedAlphabetButton: {
    backgroundColor: "#ff7508",
    borderWidth: 0,
  },
  alphabetText: {
    color: "#333",
  },
  selectedAlphabetText: {
    color: "#fff",
  },
  filteredStoresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  suggestedProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
