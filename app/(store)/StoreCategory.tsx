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
import { StoreType } from "@/interfaces/store";

interface StoreCategoryListProps {
  categories: StoreType[];
  onCategoryPress: (id: string) => void;
}

const StoreCategoryList: React.FC<StoreCategoryListProps> = ({
  categories,
  onCategoryPress,
}) => {
  const [selectedStoreCategoryId, setSelectedStoreCategoryId] = useState<
    string | null
  >(categories.length > 0 ? categories[0].id.toString() : null);

  const handlePress = (id: string) => {
    setSelectedStoreCategoryId(id);
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
        const isSelected = selectedStoreCategoryId === item.id.toString();
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
                  <Text style={styles.selectedCategoryText}>{item.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.categoryPill}>
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

export default StoreCategoryList;

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 20,
    marginVertical: 24,
  },
  categoryItem: {
    marginRight: 10,
  },
  categoryPillWrapper: {
    padding: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.foundation_pumpkin_normal,
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
    padding: 16,
    paddingVertical: 8,
    borderRadius: 100,
    gap: 8,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.foundation_pumpkin_normal,
  },
  selectedCategoryText: {
    fontSize: 14,
    color: theme.colors.foundation_white_active,
  },
});
