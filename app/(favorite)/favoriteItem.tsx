import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { CustomHeader, JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronDarkLeftIcon, SearchGreyIcon } from "@/assets/icons";
import ProductList from "../(product)/ProductList";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchFavoritesByFolder } from "@/hooks/useFetchProduct";

const FavoriteItem = () => {
  const insets = useSafeAreaInsets();
  const { folderId } = useLocalSearchParams();
  const { data: favoritesData, isLoading } = useFetchFavoritesByFolder(
    Number(folderId)
  );
  const handleProductPress = (id: number) => {
    console.log("Selected product ID:", id);
  };
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    "1"
  );

  const [categories] = useState([
    { id: "1", name: "All Tags" },
    { id: "2", name: "WithJara Tags" },
    { id: "3", name: "Discount Tags" },
  ]);

  const handlePress = (id: string) => {
    setSelectedProductId(id);
  };

  const products = favoritesData?.data || [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <CustomHeader
        title="Favorite Items"
        leftComponent={
          <View
            style={{
              backgroundColor: theme.colors.white,
              padding: 6,
              borderRadius: 20,
            }}
          >
            <ChevronDarkLeftIcon />
          </View>
        }
        onLeftPress={() => router.back()}
        rightComponent={<SearchGreyIcon />}
        containerStyle={{ backgroundColor: "transparent" }}
      />
      <View
        style={{
          marginVertical: 24,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const isSelected = selectedProductId === item.id;
            return (
              <TouchableOpacity
                onPress={() => handlePress(item.id)}
                style={styles.productItem}
              >
                <View
                  style={
                    isSelected
                      ? styles.selectedPillWrapper
                      : styles.productPillWrapper
                  }
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={["#FF2803", "#FF7508"]}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.selectedProductPill}
                    >
                      <Text style={styles.selectedProductText}>
                        {item.name}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.productPill}>
                      <Text style={styles.productText}>{item.name}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <JaraText
        size={14}
        weight="500"
        color={theme.colors.black_80}
        style={{ paddingHorizontal: 20 }}
      >
        Your complete collection of saved items
      </JaraText>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <ProductList
          viewAll={false}
          products={products.filter(
            (product) => product !== undefined && product !== null
          )}
          onProductPress={handleProductPress}
        />
      )}
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  itemsText: {
    fontSize: 16,
    color: theme.colors.neutral_dark_grey,
    marginBottom: 16,
  },
  imageContainer: {
    margin: 8,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  productItem: {
    marginRight: 10,
  },
  productPillWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.foundation_white_dark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.black_5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  filter: {
    padding: 12,
    marginLeft: 20,
    marginRight: 4,
    backgroundColor: theme.colors.foundation_white_dark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.black_5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedProductPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  productText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  selectedProductText: {
    fontSize: 14,
    color: theme.colors.foundation_white_active,
  },
});
