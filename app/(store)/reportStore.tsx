import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import {
  CustomHeader,
  JaraText,
  CustomButton,
  SuccessAlertModal,
} from "@/components";
import { ChevronDarkLeftIcon, PlusFilledIcon } from "@/assets/icons";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useSubmitReview } from "@/hooks/useFetchOrder";

const ReportStore = () => {
  const { name, image, id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [photo, setPhoto] = useState<string | null>(null); // Store photo URI
  const [modalVisible, setModalVisible] = useState(false);

  const submitReview = useSubmitReview((message) => {
    setModalVisible(true);
  });

  const handlePhotoUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Set the selected photo URI
    }
  };

  const handleSubmit = () => {
    if (!selectedIssue || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const reviewData = {
      productId: 0,
      storeId: Number(id),
      deliveryAgentId: 0,
      content: `${selectedIssue}: ${description}`,
      photo: photo || "", // Include photo URI if available
      rating: 1,
      reviewType: 2,
    };

    submitReview.mutate(reviewData, {
      onError: (error) => {
        console.error("Error submitting review:", error);
        Alert.alert("Error", "Failed to submit report. Please try again.");
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={"dark-content"} />

      {/* Header */}
      <CustomHeader
        title=""
        containerStyle={{ backgroundColor: "transparent" }}
        onLeftPress={() => router.back()}
        leftComponent={
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <ChevronDarkLeftIcon />
            <JaraText
              size={24}
              weight="600"
              lineHeight={31.2}
              color={theme.colors.black}
              children={"Report Store"}
            />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Order Number Section */}
        <View style={styles.infoSection}>
          <JaraText size={14} weight="600" lineHeight={18.2}>
            Order Number
          </JaraText>
          <JaraText size={14} weight="500" lineHeight={18.2}>
            23456789012345
          </JaraText>
        </View>

        {/* Store Name Section */}
        <View style={styles.infoSection}>
          <JaraText size={14} weight="600" lineHeight={18.2}>
            Store Name
          </JaraText>
          <View style={styles.storeNameContainer}>
            <Image source={{ uri: image }} style={styles.storeNameImage} />
            <JaraText size={14} weight="500" lineHeight={18.2}>
              {name}
            </JaraText>
          </View>
        </View>

        {/* Issue Description Section */}
        <JaraText
          size={14}
          weight="600"
          lineHeight={18.2}
          color={theme.colors.black}
          style={{ marginVertical: 20 }}
        >
          Can you tell me more about the issue with {name}
        </JaraText>
        <View style={styles.issueOptions}>
          {[
            "Was your product damaged during shipping",
            "Selling counterfeit or unauthorized products",
            "Products that don't meet the expected standards of quality.",
            "Misleading descriptions, or inaccurate images.",
          ].map((issue, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.issueOption,
                selectedIssue === issue && styles.selectedIssueOption,
              ]}
              onPress={() => setSelectedIssue(issue)}
            >
              <JaraText
                size={14}
                weight="400"
                lineHeight={18.2}
                color={
                  selectedIssue === issue
                    ? theme.colors.primary
                    : theme.colors.black_80
                }
              >
                {issue}
              </JaraText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Image Upload Section */}
        <JaraText
          size={14}
          weight="600"
          lineHeight={18.2}
          color={theme.colors.black}
          style={{ marginTop: 20 }}
        >
          Attach a photo of what you're complaining about.
        </JaraText>
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity
            style={styles.imageUploadBox}
            onPress={handlePhotoUpload}
          >
            {photo ? (
              <Image source={{ uri: photo }} style={styles.uploadedImage} />
            ) : (
              <>
                <PlusFilledIcon />
                <JaraText
                  size={12}
                  weight="500"
                  lineHeight={18.2}
                  color={theme.colors.black_80}
                >
                  Add Image
                </JaraText>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Description Input */}
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Describe the issue here..."
          placeholderTextColor={theme.colors.gery1}
          value={description}
          onChangeText={setDescription}
        />

        {/* Submit Button */}
        <CustomButton
          type="linearGradient"
          title={"Submit Report"}
          onPress={handleSubmit}
          titleStyle={{ color: theme.colors.white }}
          style={{ width: "70%", alignSelf: "center", marginVertical: 50 }}
        />
      </ScrollView>

      {/* Success Alert Modal */}
      <SuccessAlertModal
        visible={modalVisible}
        title="Report Submitted"
        description="Your report has been submitted successfully."
        buttonText="OK"
        onPressButton={() => {
          setModalVisible(false);
          router.back();
        }}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ReportStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  storeNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  storeNameImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  infoSection: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: 12,
    borderRadius: 4,
  },
  issueOptions: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 12,
  },
  issueOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.foundation_white_light_hover,
  },
  selectedIssueOption: {
    backgroundColor: theme.colors.black_5,
  },
  imageUploadContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  imageUploadBox: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.black_5,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  descriptionInput: {
    height: 80,
    backgroundColor: theme.colors.foundation_white_dark,
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    color: theme.colors.black,
    textAlignVertical: "top",
    marginVertical: 16,
  },
});
