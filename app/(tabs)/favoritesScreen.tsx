import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  TextInput,
  Button,
  ImageSourcePropType,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";

import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import {
  CustomButton,
  CustomHeader,
  JaraText,
  SuccessAlertModal,
} from "@/components";
import { PlusFilledIcon, CloseIcon } from "@/assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { truncateText } from "@/utils/formatter";
import { addFavoriteFolder } from "@/services/productService";
import { useFetchMyFavorites } from "@/hooks/useFetchProduct";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;

const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { data: favoritesData, isLoading, refetch } = useFetchMyFavorites();

  const handleAddCategory = async () => {
    if (newCategory) {
      try {
        const response = await addFavoriteFolder(newCategory);
        setNewCategory("");
        setModalVisible(false);
        setSuccessMessage(response.message);
        setIsSuccessModalVisible(true);
        refetch(); // Refresh the favorites list
      } catch (error) {
        console.error("Failed to create favorite folder:", error);
      }
    }
  };

  const handleNavigateToItems = (folderId: number) => {
    router.push({
      pathname: "/(favorite)/favoriteItem",
      params: { folderId },
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      onPress={() => handleNavigateToItems(item.folderId)}
    >
      <View style={styles.imageGrid}>
        {(item.productImages || [])
          .slice(0, 4)
          .map((imageUrl: string, index: number) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.imageBox}
            />
          ))}
      </View>
      <JaraText
        size={16}
        weight="600"
        align="left"
        lineHeight={24}
        style={{
          letterSpacing: -0.16,
          alignSelf: "flex-start",
          paddingLeft: 10,
        }}
      >
        {truncateText(item.folderName, 18)}
      </JaraText>
      <JaraText
        size={12}
        weight="400"
        align="left"
        lineHeight={18}
        color={theme.colors.neutral_dark_grey}
        style={{
          letterSpacing: -0.36,
          alignSelf: "flex-start",
          paddingLeft: 10,
        }}
      >
        {item.totalProducts} items
      </JaraText>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={"dark-content"} />
      <CustomHeader
        containerStyle={{ backgroundColor: "transparent" }}
        leftComponent={
          <JaraText
            size={24}
            weight="600"
            color={theme.colors.black}
            lineHeight={33.6}
            style={{ letterSpacing: -0.24 }}
          >
            My Favorites
          </JaraText>
        }
        rightComponent={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <PlusFilledIcon />
          </TouchableOpacity>
        }
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <FlatList
          data={favoritesData?.data || []}
          renderItem={renderCategory}
          keyExtractor={(item) => item.folderId.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <JaraText
                size={14}
                weight="600"
                lineHeight={21}
                style={{ letterSpacing: -0.14 }}
                color={theme.colors.black}
              >
                Create New Category List
              </JaraText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="New Favorite"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <CustomButton
              type="linearGradient"
              title={"Add"}
              onPress={handleAddCategory}
              style={{ width: "100%" }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <SuccessAlertModal
        visible={isSuccessModalVisible}
        title="Success!"
        description={successMessage}
        buttonText="Done"
        onPressButton={() => setIsSuccessModalVisible(false)}
        onClose={() => setIsSuccessModalVisible(false)}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
    paddingTop: 20,
  },
  listContainer: {
    alignSelf: "center",
  },
  categoryContainer: {
    width: CARD_WIDTH,
    margin: 8,
    padding: 12,
    borderColor: theme.colors.black_5,
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: "center",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  imageBox: {
    width: 55,
    height: 55,
    margin: 2,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 117, 8, 0.05)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: theme.colors.black,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: theme.colors.black_5,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 24,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    marginBottom: 24,
  },
});
