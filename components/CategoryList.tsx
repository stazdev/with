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
import { ProductCategory } from "@/interfaces/product";

// interface Category {
//   id: string;
//   name: string;
//   image: string;
// }

interface CategoryListProps {
  categories: ProductCategory[];
  onCategoryPress: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoryPress,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "1"
  );

  const handlePress = (id: string) => {
    setSelectedCategoryId(id);
    onCategoryPress(id);
  };

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const isSelected = selectedCategoryId === item.id.toString();
        return (
          <TouchableOpacity
            onPress={() => handlePress(item.id.toString())}
            style={styles.categoryItem}
          >
            <View
              style={
                isSelected
                  ? styles.selectedPillWrapper
                  : styles.categoryPillWrapper
              }
            >
              {isSelected ? (
                <LinearGradient
                  colors={["#FF2803", "#FF7508"]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.selectedCategoryPill}
                >
                  <Image
                    source={require("@/assets/images/product.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.selectedCategoryText}>{item.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.categoryPill}>
                  <Image
                    source={require("@/assets/images/product.png")}
                    resizeMode="contain"
                  />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    marginRight: 10,
  },
  categoryPillWrapper: {
    padding: 6,
    paddingRight: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.black_5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  selectedPillWrapper: {},
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedCategoryPill: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    paddingRight: 12,
    borderRadius: 100,
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  selectedCategoryText: {
    fontSize: 14,
    color: theme.colors.foundation_white_active,
  },
});
