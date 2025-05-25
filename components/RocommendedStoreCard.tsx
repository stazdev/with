// RocommendedStoreCard.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { JaraText } from "@/components";
import { theme } from "@/constants/theme";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  HeartActiveIcon,
  HeartFilledIcon,
  HeartIcon,
  HeartSmallIcon,
} from "@/assets/icons";

interface RocommendedStoreCardProps {
  image: any;
  name: string;
  storeName: string;
  price: string;
  onPress: () => void;
  isFavorite?: boolean;
}

const { width } = Dimensions.get("window");
const RocommendedStoreCard: React.FC<RocommendedStoreCardProps> = ({
  image,
  name,
  storeName,
  price,
  onPress,
  isFavorite,
}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <JaraText
          size={12}
          weight="400"
          type="Regular"
          family="Lato"
          color={theme.colors.neutral_black}
          style={{ marginBottom: 4 }}
        >
          {name}
        </JaraText>
        <JaraText
          size={12}
          weight="400"
          type="Regular"
          family="Lato"
          color={theme.colors.neutral_dark_grey}
        >
          {storeName}
        </JaraText>
        <TouchableOpacity style={styles.heart}>
          {isFavorite ? <HeartActiveIcon /> : <HeartIcon />}
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <MaskedView
            maskElement={
              <JaraText
                type="Regular"
                family="Aquire"
                size={16}
                style={styles.price}
              >
                ₦{price.toLocaleString()}
              </JaraText>
            }
          >
            <LinearGradient
              colors={["#FF7508", "#1A2610"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              <JaraText
                type="Regular"
                family="Aquire"
                size={16}
                style={{ opacity: 0, ...styles.price }}
              >
                ₦{price.toLocaleString()}
              </JaraText>
            </LinearGradient>
          </MaskedView>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width / 2 - 20,
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  storeName: {
    marginTop: 10,
    textAlign: "center",
    color: theme.colors.black,
  },
  price: {
    marginTop: 5,
  },
  priceContainer: {
    // alignItems: "flex-start",
  },
  gradientBackground: {
    width: 100,
    paddingBottom: 12,
  },
  heart: {
    position: "absolute",
    bottom: 85,
    right: 8,
    padding: 4,
    borderRadius: 12,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
});

export default RocommendedStoreCard;
