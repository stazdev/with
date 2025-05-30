import React, { ReactNode, useState } from "react"; // Added useState
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { JaraText } from "@/components";
import { theme } from "@/constants/theme";
import { useFollowStore, useUnfollowStore } from "@/hooks/useFetchStore";
import { useAuthStore } from "@/store/authStore"; // Added
import LoginPromptModal from "./LoginPromptModal"; // Added

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
  const { authToken } = useAuthStore(); // Added
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // Added
  const followStore = useFollowStore();
  const unfollowStore = useUnfollowStore();

  const handleFollowToggle = async () => {
    if (!authToken) {
      setShowLoginPrompt(true);
      return;
    }
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
    <>
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
      <LoginPromptModal
        isVisible={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        title="Login Required"
        message="Please log in or sign up to follow stores."
      />
    </>
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
    elevation: 100, // Keep original elevation if it was intentional, or adjust as needed
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
