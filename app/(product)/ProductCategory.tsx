import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/constants/theme";
import { FilterIcon } from "@/assets/icons";

interface Product {
  id: string;
  name: string;
}

interface ProductListProps {
  categories: Product[];
  onProductPress?: (id: string) => void;
  onFilterPress: () => void;
}

const ProductCategory: React.FC<ProductListProps> = ({
  categories,
  onProductPress,
  onFilterPress,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    "1"
  );

  const handlePress = (id: string) => {
    setSelectedProductId(id);
    onProductPress(id);
  };

  return (
    <View
      style={{ marginVertical: 24, flexDirection: "row", alignItems: "center" }}
    >
      <TouchableOpacity style={styles.filter} onPress={onFilterPress}>
        <FilterIcon />
      </TouchableOpacity>
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
                    <Text style={styles.selectedProductText}>{item.name}</Text>
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
  );
};

export default ProductCategory;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
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
