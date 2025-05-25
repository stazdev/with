import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import { ArrowUpIcon } from "@/assets/icons";
import StoreCard from "./StoreCard";
import { theme } from "@/constants/theme";
import { useFetchTopRatedStores } from "@/hooks/useFetchStore";
import { router } from "expo-router";

const TopRatedStore = () => {
  const { data, isLoading, error } = useFetchTopRatedStores();
  console.log(data);
  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (error) {
    return <Text>Error fetching top-rated stores: {error.message}</Text>;
  }

  return (
    <View style={styles.storeRatingCard}>
      <CollapsibleSection title={"Top Rated Stores"} leftIcon={<ArrowUpIcon />}>
        <View style={{ marginHorizontal: 16, paddingVertical: 20 }}>
          {data?.data.map((store) => (
            <StoreCard
              key={store.id}
              name={store.storeName}
              description={store.storeType}
              image={store.coverImage}
              rating={store.rating}
              onPress={() =>
                router.push({
                  pathname: "/(store)/storeDetailScreen",
                  params: {
                    id: store?.id,
                    name: store?.storeName,
                    image: store?.coverImage,
                  },
                })
              }
            />
          ))}
        </View>
      </CollapsibleSection>
    </View>
  );
};

export default TopRatedStore;

const styles = StyleSheet.create({
  storeRatingCard: {
    backgroundColor: theme.colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    marginVertical: 20,
    paddingVertical: 12,
  },
});
