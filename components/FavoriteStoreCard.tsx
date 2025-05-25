import React, { ReactNode } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { useFollowStore, useUnfollowStore } from "@/hooks/useFetchStore";

interface FavoriteStoreCardProps {
  id: number;
  name: string;
  followers: string;
  totalProducts: number;
  image: any;
  isFollowing: boolean;
  selectIcon: ReactNode;
  onFavoriteCardPress?: () => void;
}

const FavoriteStoreCard: React.FC<FavoriteStoreCardProps> = ({
  id,
  name,
  followers,
  totalProducts,
  image,
  isFollowing,
  selectIcon,
  onFavoriteCardPress,
}) => {
  const followStore = useFollowStore();
  const unfollowStore = useUnfollowStore();

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowStore.mutateAsync(id);
      } else {
        await followStore.mutateAsync(id);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onFavoriteCardPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <JaraText
          children={name}
          size={14}
          weight="500"
          lineHeight={21}
          color={theme.colors.black}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <JaraText
            children={followers}
            size={12}
            weight="400"
            lineHeight={18}
            color={theme.colors.black_80}
          />
          <JaraText
            children={totalProducts}
            size={12}
            weight="400"
            lineHeight={18}
            color={theme.colors.black_80}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleFollowToggle}
        style={styles.selectIcon}
        disabled={followStore.isPending || unfollowStore.isPending}
      >
        {selectIcon}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginVertical: 6,
    padding: 12,
    paddingHorizontal: 16,
    shadowColor: theme.colors.black_20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 100,
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    gap: 8,
  },
  selectIcon: {
    marginLeft: 10,
  },
});

export default FavoriteStoreCard;
