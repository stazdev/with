import { theme } from "@/constants/theme";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

// Import images statically at the top
import onboard1 from "../assets/images/on1.jpeg";
import onboard2 from "../assets/images/on2.jpeg";
import onboard3 from "../assets/images/on3.jpeg";
import onboard4 from "../assets/images/on4.jpeg";
import onboard5 from "../assets/images/on5.jpeg";
import { CustomButton, JaraText } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

const windowWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("screen").height;

type SlideType = {
  id: string;
  image: any; // Image source type
  title: string;
  subtitle: string;
  buttonText: string;
  indicatorText: string;
};

const slides: SlideType[] = [
  {
    id: "1",
    image: onboard1,
    title: "WithJara Your Everything\nStore",
    subtitle:
      "Get products at your fingertips, provisions ,  electronics, beauty  grocery, home essentials. All available on WithJara Stores.",
    buttonText: "Let's Get Started",
    indicatorText: "Welcome to Withjara",
  },
  {
    id: "2",
    image: onboard2,
    title: "Convenience At Your\nFingertips",
    subtitle:
      "Enjoy hassle-free shopping with our user-friendly app.\nEnjoy fast and secure checkout, plus easy returns.",
    buttonText: "Let's Get Started",
    indicatorText: "Hassle Free Shopping",
  },
  {
    id: "3",
    image: onboard3,
    title: "Quality Products, Amazing\nPrices, Fast Delivery.",
    subtitle:
      "Get your favorite styles delivered right to your\ndoorstep. Enjoy next-day delivery on selected items.",
    buttonText: "Let's Get Started",
    indicatorText: "Quality and Value Guaranteed",
  },
  {
    id: "4",
    image: onboard4,
    title: "Flexible Shopping\nExperience",
    subtitle:
      "Flexible shopping, instant delivery & extra gift on every shopping.",
    buttonText: "Let's Get Started",
    indicatorText: "Shop with Flexibility",
  },
  {
    id: "5",
    image: onboard5,
    title: "Fun & Convenient\nShopping",
    subtitle:
      "Enjoy a fun, convenient shopping experience from any super store at any time.",
    buttonText: "Let's Get Started",
    indicatorText: "Convenience Redefined",
  },
];

type SlideProps = {
  item: SlideType;
  index: number;
};
const Slide = ({ item }: SlideProps) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
    return () => {
      opacity.value = 0; // Reset opacity on unmount to ensure animation resets
    };
  }, [item]); // Re-run whenever the slide content changes

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.slide}>
      <Animated.Image source={item.image} style={styles.image} />

      <BlurView intensity={10} tint="dark" style={styles.textContainer}>
        <Animated.View style={animatedContentStyle}>
          {item.id === "1" ? (
            <View style={styles.gradientTitleContainer}>
              <MaskedView
                maskElement={
                  <JaraText
                    size={28}
                    weight="700"
                    align="center"
                    color={theme.colors.white}
                    lineHeight={33.6}
                  >
                    WithJara
                  </JaraText>
                }
              >
                <LinearGradient
                  colors={["#FF2803", "#FF7508"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <JaraText
                    size={28}
                    weight="700"
                    align="center"
                    color={theme.colors.white}
                    lineHeight={33.6}
                    style={{ opacity: 0 }}
                  >
                    WithJara
                  </JaraText>
                </LinearGradient>
              </MaskedView>
              <JaraText
                size={28}
                weight="700"
                align="left"
                color={theme.colors.white}
                lineHeight={33.6}
              >
                {" Your Everything\nStore"}
              </JaraText>
            </View>
          ) : (
            <JaraText
              size={28}
              weight="700"
              align="center"
              color={theme.colors.white}
              style={{ marginBottom: 16 }}
              lineHeight={33.6}
            >
              {item.title}
            </JaraText>
          )}
          {/* Keep subtitle rendering the same */}
          <JaraText
            size={16}
            align="center"
            lineHeight={25.6}
            color={theme.colors.foundation_white_dark}
            style={{ paddingHorizontal: 16 }}
          >
            {item.subtitle}
          </JaraText>
        </Animated.View>
      </BlurView>
    </View>
  );
};

type IndicatorProps = {
  currentIndex: number;
};

const Indicator = ({ currentIndex }: IndicatorProps) => {
  const segmentWidth = (windowWidth - 10) / slides.length;

  // Use useRef to persist the animatedWidths array across renders
  const animatedWidths = useRef(slides.map(() => useSharedValue(0))).current;

  useEffect(() => {
    animatedWidths.forEach((width, idx) => {
      width.value =
        idx === currentIndex
          ? withTiming(segmentWidth, { duration: 10000, easing: Easing.ease })
          : 0;
    });
  }, [currentIndex]);

  const renderIndicatorText = () => (
    <MaskedView
      style={{ marginTop: 32 }}
      maskElement={
        <Text style={styles.indicatorText}>
          {slides[currentIndex].indicatorText}
        </Text>
      }
    >
      <LinearGradient
        colors={
          currentIndex === 2 ? ["#FF2803", "#FF7508"] : ["#FF7508", "#1A2610"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{ opacity: 0 }}>{slides[currentIndex].indicatorText}</Text>
      </LinearGradient>
    </MaskedView>
  );

  return (
    <View style={styles.indicatorContainer}>
      <View style={styles.indicatorWrapper}>
        {animatedWidths.map((width, idx) => (
          <View
            key={idx}
            style={[
              styles.indicatorBackground,
              { marginRight: idx < slides.length - 1 ? 5 : 0 },
            ]}
          >
            <Animated.View
              style={[
                styles.indicator,
                useAnimatedStyle(() => ({ width: width.value })),
              ]}
            />
          </View>
        ))}
      </View>
      {renderIndicatorText()}
    </View>
  );
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const onButtonPress = (index: number) => {
    const nextIndex = index === slides.length - 1 ? 0 : index + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
      flatListRef.current?.scrollToIndex({
        index: (currentIndex + 1) % slides.length,
        animated: true,
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.round(offsetX / windowWidth));
  };

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {currentIndex < slides.length && (
        <Indicator currentIndex={currentIndex} />
      )}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => <Slide item={item} index={index} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={slides[currentIndex].buttonText}
          onPress={() => router.push("/welcomeScreen")}
          type="linearGradient"
        />
        <CustomButton
          title="Skip"
          onPress={() => router.replace("/welcomeScreen")}
          type="transparent"
          style={{ paddingHorizontal: 0 }}
          Textstyle={{ fontSize: 14 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    height: screenHeight,
  },
  slide: {
    width: windowWidth,
    height: screenHeight,
    overflow: "hidden",
  },
  image: {
    width: windowWidth,
    height: screenHeight,
    resizeMode: "cover",
  },

  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(18, 16, 19, 0.50)",
    paddingBottom: 150,
    paddingTop: 48,
    borderTopRightRadius: 160,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? (StatusBar.currentHeight || 0) + 85 : 65,
    width: windowWidth,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  indicatorWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 6,
    paddingHorizontal: 5,
  },
  indicatorBackground: {
    flex: 1,
    backgroundColor: theme.colors.scarlet_light_hover,
    borderRadius: 10,
  },
  indicator: {
    height: "100%",
    backgroundColor: "#FF4500",
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  gradientTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 16,
  },
});
