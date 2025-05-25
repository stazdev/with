import React, { useState, useRef, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Import the navigation hook
import { theme } from "@/constants/theme";
import {
  HomeHeader,
  JaraModal,
  JaraText,
  Search,
  SectionTitle,
} from "@/components";
import {
  BellIcon,
  CheckFilledIcon,
  PlusCircle,
  SearchActiveIcon,
  SearchGreyIcon,
} from "@/assets/icons";
import SearchBar from "@/components/SearchBar";
import ProductTab from "../(product)/ProductTab";
import StoreTab from "../(store)/StoreTab";
import FavoriteStoreCard from "@/components/FavoriteStoreCard"; // Import the new card component
import { useFetchFollowedStores } from "@/hooks/useFetchStore";

const { width } = Dimensions.get("window");

// Define available tab types
type TabType = "Stores" | "Products";

const popularProducts = [
  { id: 1, name: "Steam Iron", icon: require("@/assets/images/iron.png") },
  {
    id: 2,
    name: "Electric Cooker",
    icon: require("@/assets/images/cooker.png"),
  },
  { id: 3, name: "Blenders", icon: require("@/assets/images/blender.png") },
  { id: 4, name: "Headphone", icon: require("@/assets/images/headphone.png") },
  { id: 5, name: "B.T Mouse", icon: require("@/assets/images/mouse.png") },
  { id: 6, name: "Desktop", icon: require("@/assets/images/desktop.png") },
  { id: 7, name: "Laptops", icon: require("@/assets/images/laptop.png") },
  { id: 8, name: "Printers", icon: require("@/assets/images/printer.png") },
];

const categories = [
  { id: 1, name: "Appliances" },
  { id: 2, name: "Phones & Tablets" },
  { id: 3, name: "Health & Beauty" },
  { id: 4, name: "Home & Office" },
  { id: 5, name: "Electronics" },
  { id: 6, name: "Fashion" },
  { id: 7, name: "Supermarket" },
];

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // Initialize the navigation hook
  const [selectedTab, setSelectedTab] = useState<TabType>("Products");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const tabUnderline = useRef(new Animated.Value(0)).current; // Start at 0 for "Products"
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateX = useRef(new Animated.Value(0)).current;
  const [isProductSearchModalVisible, setProductSearchModalVisible] =
    useState(false);
  const [isStoreSearchModalVisible, setStoreSearchModalVisible] =
    useState(false);

  const openProductSearchModal = () => setProductSearchModalVisible(true);
  const closeProductSearchModal = () => setProductSearchModalVisible(false);
  const openStoreSearchModal = () => setStoreSearchModalVisible(true);
  const closeStoreSearchModal = () => setStoreSearchModalVisible(false);

  const {
    data: favoriteStoresData,
    isLoading: isLoadingFavorites,
    error: favoriteStoresError,
    refetch: refetchFavoriteStores,
  } = useFetchFollowedStores();

  // Handle search input submission
  const handleSearchSubmit = (keyword: string) => {
    if (keyword) {
      router.push(`/searchScreen?keyword=${encodeURIComponent(keyword)}`);
      closeProductSearchModal();
    }
  };
  // Handle store search input submission
  const handleStoreSearchSubmit = (keyword: string) => {
    if (keyword) {
      router.push(`/searchScreen?keyword=${encodeURIComponent(keyword)}`);
      closeStoreSearchModal();
    }
  };

  // Effect to animate content when switching tabs
  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1, // Fully visible
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateX, {
        toValue: 0, // Back to the original position (no translation)
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selectedTab]);

  // Function to handle tab switching with animation
  // Update the handleTabSwitch function's underline animation
  const handleTabSwitch = (tab: TabType): void => {
    if (tab === selectedTab) return;

    // CORRECTED POSITION CALCULATION
    const tabWidth = width / 2;
    const newPosition = tab === "Stores" ? tabWidth : 0;

    // Reset content animation values
    contentOpacity.setValue(0);
    contentTranslateX.setValue(tab === "Products" ? -width : width);

    // Update selected tab
    setSelectedTab(tab);

    // Animate both underline and content
    Animated.parallel([
      // Underline animation (key fix)
      Animated.timing(tabUnderline, {
        toValue: newPosition,
        duration: 300,
        useNativeDriver: false,
      }),
      // Content animations
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleFavoriteCardPress = (store: {
    id: number;
    name: string;
    followers: string;
    image: any;
    productCount: number;
    description: string;
    tagline: string;
    avgRating: number;
    isFollowing?: boolean;
  }) => {
    console.log(store.image);
    router.push({
      pathname: "/(store)/storeScreen",
      params: {
        id: store.id,
        name: store.name,
        followers: store.followers,
        image: store.image, // Ensure the image URI is passed correctly
        productCount: store.productCount,
        description: store.description,
        tagline: store.tagline,
        avgRating: store.avgRating,
        isFollowing: store.isFollowing, // Pass the isFollowing status
      },
    });
  };

  // Function to render the content based on the selected tab
  const renderContent = (): JSX.Element => {
    if (selectedTab === "Products") {
      return (
        <View>
          <SearchBar
            value="Search Products"
            rightItem={<BellIcon />}
            rightIcon={<SearchActiveIcon />}
            rightIconPress={openProductSearchModal}
          />
          <ProductTab />
        </View>
      );
    } else if (selectedTab === "Stores") {
      return (
        <View>
          <SearchBar
            value="Search Stores"
            rightItem={<BellIcon />}
            rightIcon={<SearchActiveIcon />}
            rightIconPress={openStoreSearchModal}
          />
          <StoreTab />
        </View>
      );
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={[{ paddingTop: insets.top }]}>
        <HomeHeader />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabSwitch("Products")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Products" && styles.activeTabText,
            ]}
          >
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabSwitch("Stores")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Stores" && styles.activeTabText,
            ]}
          >
            Stores
          </Text>
        </TouchableOpacity>

        <View style={styles.fullGreyBorder} />

        <Animated.View
          style={[
            styles.tabUnderline,
            { transform: [{ translateX: tabUnderline }] },
          ]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Animated content */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: contentOpacity,
              transform: [{ translateX: contentTranslateX }],
            },
          ]}
        >
          {renderContent()}
        </Animated.View>
      </ScrollView>
      {/* product search modal */}
      <JaraModal
        isVisible={isProductSearchModalVisible}
        onClose={closeProductSearchModal}
        initialSnapPoint="50%"
        maxSnapPoint="100%"
        containerStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        contentContainerStyle={{ marginHorizontal: 16 }}
        scrollable
      >
        {/* Search Input */}
        <Search
          variant="outlined"
          leftIcon={<SearchGreyIcon />}
          rightItem={
            <JaraText
              children={"Cancel"}
              size={14}
              weight="400"
              lineHeight={21}
            />
          }
          rightItemPress={closeProductSearchModal}
          onSubmitEditing={(event) =>
            handleSearchSubmit(event.nativeEvent.text)
          } // Add the search submit handler
        />

        {/* Popular Products Section */}
        <SectionTitle
          title="Popular Products"
          style={{ marginTop: 20, marginBottom: 10 }}
          titleStyle={{ fontSize: 18, color: "#232323", fontWeight: "600" }}
        />

        <View style={styles.popularProductsContainer}>
          {popularProducts.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Image source={product.icon} style={{ width: 50, height: 50 }} />
              <JaraText size={14} weight="500" style={{ letterSpacing: -0.14 }}>
                {product.name}
              </JaraText>
            </View>
          ))}
        </View>
        {/* Top Categories Section */}
        <SectionTitle
          title="Top Categories"
          style={{ marginTop: 30, marginBottom: 10 }}
          titleStyle={{ fontSize: 18, color: "#232323", fontWeight: "600" }}
        />

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              activeOpacity={0.7}
              // onPress={() => console.log(${category.name} clicked)}
            >
              <SearchGreyIcon style={styles.categoryIcon} />
              <JaraText
                size={14}
                weight="400"
                lineHeight={21}
                style={{ letterSpacing: -0.14 }}
              >
                {category.name}
              </JaraText>
            </TouchableOpacity>
          ))}
        </View>
      </JaraModal>
      {/* store search modal */}
      <JaraModal
        isVisible={isStoreSearchModalVisible}
        onClose={closeStoreSearchModal}
        initialSnapPoint="50%"
        maxSnapPoint="80%"
        containerStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        style={{ flex: 1 }}
        scrollable
      >
        {/* Search Input */}
        <View style={{ marginHorizontal: 16 }}>
          <Search
            variant="outlined"
            leftIcon={<SearchGreyIcon />}
            rightItem={
              <JaraText
                children={"Cancel"}
                size={14}
                weight="400"
                lineHeight={21}
              />
            }
            rightItemPress={closeStoreSearchModal}
            onSubmitEditing={(event) =>
              handleStoreSearchSubmit(event.nativeEvent.text)
            }
          />
        </View>
        {/* Favorites Section */}
        <SectionTitle
          title="Customer Favorites"
          style={{ marginTop: 20, paddingHorizontal: 16 }}
          titleStyle={{
            fontSize: 12,
            color: theme.colors.foundation_pumpkin_normal,
            fontWeight: "600",
          }}
        />
        {/* Customer Favorites */}
        <View style={styles.customerFavorites}>
          {isLoadingFavorites ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : favoriteStoresError ? (
            <Text>
              Error fetching favorite stores: {favoriteStoresError.message}
            </Text>
          ) : (
            favoriteStoresData?.data.map((store) => (
              <FavoriteStoreCard
                key={store.id}
                id={store.id}
                name={store.storeName}
                followers={`${store.totalFollowers} followers`}
                image={{ uri: store.coverImage }}
                isFollowing={store.isFollowing}
                selectIcon={
                  store.isFollowing ? <CheckFilledIcon /> : <PlusCircle />
                }
                onFavoriteCardPress={() =>
                  handleFavoriteCardPress({
                    id: store.id,
                    name: store.storeName,
                    followers: `${store.totalFollowers} followers`,
                    image: store.coverImage,
                    productCount: 0,
                    description: "",
                    tagline: "",
                    avgRating: 0,
                    isFollowing: store.isFollowing,
                  })
                }
                totalProducts={0}
              />
            ))
          )}
        </View>
      </JaraModal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginTop: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 20,
    color: theme.colors.black_20,
    fontWeight: "700",
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: width / 2,
    backgroundColor: theme.colors.primary,
  },
  fullGreyBorder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 1,
    backgroundColor: theme.colors.black_20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  popularProductsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  productItem: {
    alignItems: "center",
    marginVertical: 10,
    width: "25%",
    gap: 10,
  },
  productText: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  categoriesContainer: {
    // marginTop: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  customerFavorites: {
    paddingHorizontal: 16,
  },
});
