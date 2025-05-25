import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useFetchBanners } from "@/hooks/useFetchProduct";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 20;

const CustomCarousel: React.FC = () => {
  const { data, isLoading, error } = useFetchBanners();
  const banners = data?.data || [];
  const scrollX = useSharedValue(0);
  const carouselRef = useRef<Animated.ScrollView>(null);
  console.log("this is it", banners);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextOffset =
          (scrollX.value + ITEM_WIDTH) % (banners.length * ITEM_WIDTH);
        carouselRef.current.scrollTo({ x: nextOffset, animated: true });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (error) {
    return <Text>Error loading banners</Text>;
  }

  return (
    <View style={styles.carouselWrapper}>
      <Animated.ScrollView
        ref={carouselRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContainer}
      >
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={[styles.carouselItem, { backgroundColor: "#3498db" }]}
          >
            <Text style={styles.carouselText}>{banner.name}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <Dot key={index} scrollX={scrollX} index={index} />
        ))}
      </View>
    </View>
  );
};

const Dot = ({
  scrollX,
  index,
}: {
  scrollX: Animated.SharedValue<number>;
  index: number;
}) => {
  const inputRange = [
    (index - 1) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    (index + 1) * ITEM_WIDTH,
  ];
  const outputRange = [0.3, 1, 0.3];

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollX.value, inputRange, outputRange, "clamp"),
    };
  });

  return <Animated.View style={[styles.dot, opacity]} />;
};

const styles = StyleSheet.create({
  carouselWrapper: {
    marginBottom: 16,
  },
  carouselContainer: {
    alignItems: "center",
  },
  carouselItem: {
    width: ITEM_WIDTH,
    height: 137,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  carouselText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
});

export default CustomCarousel;
