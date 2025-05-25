// StoreCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import JaraText from "./JaraText";

interface StoreCardProps {
  name: string;
  description: string;
  image: any;
  rating: number;
  onPress: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  description,
  image,
  rating,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.storeImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <JaraText
            size={16}
            weight="600"
            color={theme.colors.foundation_green_normal}
            style={{ marginBottom: 8 }}
          >
            {name}
          </JaraText>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={index < rating ? "star" : "star-outline"}
                size={16}
                color="#A2845E"
              />
            ))}
          </View>
        </View>
        <JaraText size={12} weight="500" color={theme.colors.black_21}>
          {description}
        </JaraText>
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    borderWidth: 0.5,
    borderColor: theme.colors.black_5,
  },
  storeImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  storeDescription: {
    fontSize: 12,
    color: "#777",
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
