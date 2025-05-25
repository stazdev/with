import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/theme";
import {
  Carousel,
  CustomButton,
  FavoriteStoreCard,
  JaraText,
  RocommendedStoreCard,
  Search,
  SectionTitle,
} from "@/components";
import { CartFilledIcon, ChevronGreyLeftIcon } from "@/assets/icons";
import StoreCategoryList from "./StoreCategory";
import {
  useFollowStore,
  useUnfollowStore,
  useFetchStoreProducts,
} from "@/hooks/useFetchStore";
import { useFetchStore } from "@/hooks/useFetchStore";
import CustomCarousel from "@/components/Carousel";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 40; // Adjust item width for proper alignment

const banners = [
  { id: 1, title: "45% Off Groceries", backgroundColor: "#f39c12" },
  { id: 2, title: "New Arrivals", backgroundColor: "#3498db" },
  { id: 3, title: "Flash Sales", backgroundColor: "#27ae60" },
];

const suggestedProducts = [
  {
    id: 1,
    name: "Portable Fan",
    storeName: "Dhemmex Store",
    price: "195,900.00",
    image: require("@/assets/images/fan.png"),
  },
  {
    id: 2,
    name: "Portable Fan",
    storeName: "Dhemmex Store",
    price: "195,900.00",
    image: require("@/assets/images/fan.png"),
  },
  {
    id: 3,
    name: "Portable Fan",
    storeName: "Dhemmex Store",
    price: "195,900.00",
    image: require("@/assets/images/fan.png"),
  },
  {
    id: 4,
    name: "Portable Fan",
    storeName: "Dhemmex Store",
    price: "195,900.00",
    image: require("@/assets/images/fan.png"),
  },
];

const MainPage = () => (
  <>
    <View style={styles.sectionTitle}>
      <SectionTitle title="Popular Products" />
    </View>
    <View style={styles.suggestedProductsContainer}>
      {suggestedProducts.map((product) => (
        <RocommendedStoreCard
          key={product.id}
          image={product.image}
          storeName={product.storeName}
          price={product.price}
          onPress={() => console.log("Pressed on", product.storeName)}
          name={product.name}
        />
      ))}
    </View>
  </>
);

const BestSeller = () => {
  const [categories] = useState([
    { id: "1", name: "Elecronics" },
    { id: "2", name: "Phones & Gadgets" },
    { id: "3", name: "Ear Pods" },
    { id: "4", name: "Computer" },
    { id: "5", name: "Tablets" },
  ]);
  return (
    <>
      <StoreCategoryList
        categories={categories}
        onCategoryPress={() => console.log("Category pressed")}
      />
      <View style={styles.suggestedProductsContainer}>
        {suggestedProducts.map((product) => (
          <RocommendedStoreCard
            key={product.id}
            image={product.image}
            storeName={product.storeName}
            price={product.price}
            onPress={() => console.log("Pressed on", product.storeName)}
            name={product.name}
          />
        ))}
      </View>
    </>
  );
};

const StoreScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<ScrollView>(null);

  const { data: storeData, isLoading, error } = useFetchStore(Number(id));
  const store = storeData?.data;
  const [isFollowing, setIsFollowing] = useState(store?.isFollowing);
  const [followerCount, setFollowerCount] = useState(store?.totalFollowers);

  const followStore = useFollowStore();
  const unfollowStore = useUnfollowStore();
  const {
    data: storeProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useFetchStoreProducts(Number(id));

  const AllProduct = () => (
    <>
      <View style={styles.sectionTitle}>
        <SectionTitle title="All Products" />
      </View>
      <View style={styles.suggestedProductsContainer}>
        {isLoadingProducts ? (
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        ) : errorProducts ? (
          <Text>Error loading products</Text>
        ) : (
          storeProducts?.data?.map((product) => (
            <RocommendedStoreCard
              key={product.id}
              image={{ uri: product.productImages[0].imageUrl }}
              storeName={product.storeName}
              price={product.unitPrice.toString()}
              onPress={() => console.log("Pressed on", product.storeName)}
              name={product.name}
              isFavorite={product.isFavorite}
            />
          ))
        )}
      </View>
    </>
  );

  const tabContent = [
    { key: 0, content: <MainPage /> },
    { key: 1, content: <AllProduct /> },
    { key: 2, content: <BestSeller /> },
  ];

  const onTabPress = (index: React.SetStateAction<number>) =>
    setActiveTab(index);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextOffset =
          (scrollX._value + ITEM_WIDTH) % (banners.length * ITEM_WIDTH);
        carouselRef.current.scrollTo({ x: nextOffset, animated: true });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowStore.mutateAsync(Number(id));
        setIsFollowing(false);
        setFollowerCount((prevCount) => prevCount - 1);
      } else {
        await followStore.mutateAsync(Number(id));
        setIsFollowing(true);
        setFollowerCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (error) {
    return <JaraText>Error loading store data</JaraText>;
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.searchContainer}>
        <Search
          variant="filledOutlined"
          leftItem={<ChevronGreyLeftIcon />}
          leftItemPress={() => router.back()}
          rightItem={<CartFilledIcon />}
          rightItemPress={() => router.push("/(tabs)/cartScreen")}
          placeholder={`Search in ${store?.storeName}`}
        />
      </View>

      <View style={styles.favoriteStoreContainer}>
        <FavoriteStoreCard
          onFavoriteCardPress={() =>
            router.push({
              pathname: "/(store)/storeDetailScreen",
              params: {
                id: store?.id,
                name: store?.storeName,
                followers: store?.totalFollowers,
                image: store?.coverImage,
                description: store?.description,
                tagline: store?.tagline,
                avgRating: store?.avgRating,
              },
            })
          }
          name={store?.storeName}
          followers={`${store?.totalFollowers} followers`}
          totalProducts={`${store?.totalProducts} products`}
          image={{ uri: store?.coverImage }} // Ensure the image is passed as a URI
          selectIcon={
            <CustomButton
              type="linearGradient"
              title={isFollowing ? "Following" : "Follow"}
              onPress={handleFollowToggle}
              style={styles.followButton}
              disabled={followStore.isPending || unfollowStore.isPending}
            />
          }
        />
      </View>

      <View style={styles.tabContainer}>
        {["Main Page", "All Products", "Best Seller"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => onTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 24 }}>
        <CustomCarousel />
      </View>

      <View style={styles.tabContent}>
        {tabContent.find((tab) => tab.key === activeTab)?.content}
      </View>
    </ScrollView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  favoriteStoreContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  tabButton: {
    paddingVertical: 12,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.foundation_pumpkin_normal,
  },
  tabText: {
    color: theme.colors.black_80,
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
    color: theme.colors.black_21,
  },
  carouselWrapper: {
    marginTop: 24,
  },
  carouselContainer: {
    alignItems: "center",
    paddingHorizontal: 12,
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
    backgroundColor: theme.colors.foundation_pumpkin_normal,
    marginHorizontal: 4,
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    // marginLeft: 20,
    marginBottom: 20,
  },
  suggestedProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // paddingHorizontal: 16,
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  followers: {
    fontSize: 16,
    color: theme.colors.black_80,
  },
  tagline: {
    fontSize: 18,
    fontStyle: "italic",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  productCount: {
    fontSize: 16,
    marginVertical: 8,
  },
  avgRating: {
    fontSize: 16,
    marginVertical: 8,
  },
});
