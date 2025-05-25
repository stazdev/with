import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { theme } from "@/constants/theme";
import JaraText from "./JaraText";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CollapsibleSection from "./CollapsibleSection";
import { StarIcon, NairaIcon } from "@/assets/icons";
import CustomButton from "./CustomButton";

const { width } = Dimensions.get("window");
const ratings = [1, 2, 3, 4, 5, 6];

const FilterContent = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSelectRating = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  return (
    <View style={styles.container}>
      <JaraText
        size={18}
        weight="700"
        lineHeight={28}
        color={theme.colors.neutral_black}
        style={styles.titleText}
      >
        Filter
      </JaraText>

      {/* Collapsible Sections */}
      <CollapsibleSection
        title="Sort By"
        children={undefined}
        containerStyle={styles.sectionContainer}
      />
      <CollapsibleSection
        title="Category"
        children={undefined}
        containerStyle={styles.sectionContainer}
      />

      {/* Rating Section */}
      <JaraText
        size={18}
        weight="700"
        lineHeight={28}
        color={theme.colors.neutral_black}
        style={styles.ratingTitle}
      >
        Rating
      </JaraText>

      {/* Ratings ScrollView Container */}
      <View style={styles.ratingScrollContainer}>
        <BottomSheetScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ratingListContainer}
        >
          {ratings.map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingItem,
                selectedRating === rating
                  ? styles.selectedRatingItem
                  : styles.unselectedRatingItem,
              ]}
              onPress={() => handleSelectRating(rating)}
            >
              <Text
                style={[
                  styles.ratingText,
                  selectedRating === rating
                    ? styles.selectedRatingText
                    : styles.unselectedRatingText,
                ]}
              >
                {rating}
              </Text>
              <StarIcon />
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </View>

      {/* Price Section */}
      <JaraText
        size={18}
        weight="700"
        lineHeight={28}
        color={theme.colors.neutral_black}
        style={styles.ratingTitle}
      >
        Price
      </JaraText>
      <View style={styles.priceContainer}>
        <View style={styles.priceInputContainer}>
          <View style={styles.nairaIconContainer}>
            <Text>₦</Text>
          </View>
          <TextInput
            style={styles.priceInput}
            placeholder="Highest"
            value={minPrice}
            onChangeText={setMinPrice}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.neutral_dark_grey}
          />
        </View>
        <View style={styles.priceInputContainer}>
          <View style={styles.nairaIconContainer}>
            <Text>₦</Text>
          </View>
          <TextInput
            style={styles.priceInput}
            placeholder="Lowest"
            value={maxPrice}
            onChangeText={setMaxPrice}
            keyboardType="numeric"
            placeholderTextColor={theme.colors.neutral_dark_grey}
          />
        </View>
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Reset"
          onPress={() => {}}
          style={{
            width: "48%",

            backgroundColor: theme.colors.foundation_pumpkin_light,
          }}
          titleStyle={{ color: theme.colors.black_80 }}
        />
        <CustomButton
          type="linearGradient"
          title="Apply"
          onPress={() => {}}
          style={{ width: "48%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
  },
  titleText: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  ratingTitle: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  ratingScrollContainer: {
    width: width,
  },
  ratingListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    minWidth: 80,
    justifyContent: "center",
  },
  selectedRatingItem: {
    backgroundColor: theme.colors.foundation_pumpkin_normal,
    borderColor: theme.colors.foundation_pumpkin_normal,
  },
  unselectedRatingItem: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.foundation_pumpkin_normal,
  },
  ratingText: {
    fontWeight: "600",
    fontSize: 14,
  },
  selectedRatingText: {
    color: theme.colors.white,
  },
  unselectedRatingText: {
    color: theme.colors.primary,
  },
  // New Price Section Styles
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: theme.colors.neutral_dark_grey,
    borderRadius: 50,
    height: 48,
    paddingHorizontal: 16,
  },
  nairaIconContainer: {
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: theme.colors.neutral_black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  resetButtonText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  applyButtonText: {
    color: theme.colors.white,
    fontWeight: "600",
  },
});

export default FilterContent;
