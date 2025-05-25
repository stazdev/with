import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import {
  CustomButton,
  CustomCheckBox,
  CustomHeader,
  JaraText,
  SectionTitle,
  SuccessAlertModal,
} from "@/components";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronGreyLeftIcon,
  EnvelopSmallIcon,
  CalendarActiveIcon,
  MapSmallIcon,
  EditIcon,
  FlagIcon,
  ChevronDownIcon,
} from "@/assets/icons";
import JaraInput from "@/components/JaraInput";
import { formatPhoneNumber } from "@/utils/formatter";
import { router } from "expo-router";
import useProfileStore from "@/store/profileStore";
import { useUpdateProfile } from "@/hooks/useFetchAccount";

const { width } = Dimensions.get("window");

// Define profile type for better type safety
type ProfileType = {
  fullName: string;
  email: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
  address: string;
  bio: string;
};

const GENDERS = ["Male", "Female"];

const MyProfile = () => {
  const insets = useSafeAreaInsets();
  const { profileData } = useProfileStore();
  const [defaultAddress, setDefaultAddress] = useState(true);
  const [profile, setProfile] = useState<ProfileType>({
    fullName: profileData?.fullName || "",
    email: profileData?.email || "",
    birthDate: profileData?.dateOfBirth || "",
    gender: profileData?.gender || "",
    phoneNumber: profileData?.phoneNumber || "",
    address: "No 12, Oshinteye Street, Off Demurin Road, Lagos, Nigeria.",
    bio: profileData?.bio || "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(
    profileData?.profileImage || null
  );

  const [editableField, setEditableField] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (profileData) {
      setProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        birthDate: profileData.dateOfBirth,
        gender: profileData.gender,
        phoneNumber: profileData.phoneNumber,
        address: "No 12, Oshinteye Street, Off Demurin Road, Lagos, Nigeria.",
        bio: profileData.bio,
      });
      setProfileImage(profileData.profileImage);
    }
  }, [profileData]);

  const handleFieldChange = (field: keyof ProfileType, value: string) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  const handleToggleEdit = (field: keyof ProfileType) => {
    setEditableField(editableField === field ? null : field);
  };

  const handleToggleDefaultAddress = (value: boolean) => {
    setDefaultAddress(value);
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDatePickerDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleFieldChange("birthDate", formattedDate);
    }
  };

  const handleGenderSelect = (gender: string) => {
    handleFieldChange("gender", gender);
    setShowGenderPicker(false);
  };

  const handleUpdateProfile = () => {
    const profileDataToUpdate = {
      fullName: profile.fullName,
      phoneNumber: profile.phoneNumber,
      gender: profile.gender,
      photo: profileImage || "",
      bio: profile.bio,
      dateOfBirth: profile.birthDate
        ? new Date(profile.birthDate).toISOString()
        : "",
    };

    updateProfile(profileDataToUpdate, {
      onSuccess: () => {
        setModalVisible(true);
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    });
  };

  const renderGenderPicker = () => {
    if (!showGenderPicker) return null;

    return (
      <View style={styles.genderPickerContainer}>
        {GENDERS.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={styles.genderOption}
            onPress={() => handleGenderSelect(gender)}
          >
            <JaraText size={14} weight="400" color={theme.colors.black_80}>
              {gender}
            </JaraText>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CustomHeader
        title="My Profile"
        titleStyle={{ color: theme.colors.foundation_pumpkin_normal }}
        leftComponent={<ChevronGreyLeftIcon />}
        onLeftPress={() => router.back()}
        rightComponent={<View style={{ width: 20 }} />}
        containerStyle={{ backgroundColor: "transparent" }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: profileImage || "https://via.placeholder.com/120",
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Section
            title="Full Name"
            field="fullName"
            profile={profile}
            editableField={editableField}
            onToggleEdit={handleToggleEdit}
            onChangeText={handleFieldChange}
          />

          <Section
            title="Email"
            field="email"
            rightText="Change"
            icon={<EnvelopSmallIcon />}
            profile={profile}
            editableField={editableField}
            onToggleEdit={handleToggleEdit}
            onChangeText={handleFieldChange}
          />

          <View
            style={[
              {
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
                marginBottom: 14,
              },
            ]}
          >
            <View style={{ flexDirection: "column", width: width / 2 - 24 }}>
              <JaraText
                size={16}
                weight="500"
                color={theme.colors.black}
                style={{ marginBottom: 12 }}
              >
                Date of Birth (optional)
              </JaraText>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <JaraInput
                  variant="filled"
                  placeholder="Select date"
                  value={profile.birthDate}
                  onChangeText={() => {}}
                  rightIcon={<CalendarActiveIcon />}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "column", width: width / 2 - 24 }}>
              <JaraText
                size={16}
                weight="500"
                color={theme.colors.black}
                style={{ marginBottom: 12 }}
              >
                Gender
              </JaraText>
              <TouchableOpacity
                onPress={() => setShowGenderPicker(!showGenderPicker)}
              >
                <JaraInput
                  variant="filled"
                  placeholder="Select gender"
                  value={profile.gender}
                  onChangeText={() => {}}
                  rightIcon={<ChevronDownIcon />}
                />
              </TouchableOpacity>
              {renderGenderPicker()}
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={datePickerDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Section
            title="Bio"
            field="bio"
            rightText="Edit"
            profile={profile}
            editableField={editableField}
            onToggleEdit={handleToggleEdit}
            onChangeText={handleFieldChange}
            multiline
          />

          <View style={styles.mb}>
            <JaraText
              size={16}
              weight="500"
              color={theme.colors.black}
              style={{ marginBottom: 12 }}
            >
              Phone Number
            </JaraText>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <FlagIcon />
                <JaraText size={14} weight="500" color={theme.colors.black}>
                  +234
                </JaraText>
              </View>

              <JaraInput
                variant="filled"
                placeholder="Phone Number"
                value={formatPhoneNumber(profile.phoneNumber)}
                onChangeText={(text) => handleFieldChange("phoneNumber", text)}
                style={{ flex: 1 }}
              />
            </View>
          </View>

          <Section
            title="Address"
            field="address"
            rightText="Change"
            icon={<MapSmallIcon />}
            profile={profile}
            editableField={editableField}
            onToggleEdit={handleToggleEdit}
            onChangeText={handleFieldChange}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 60,
            }}
          >
            <CustomCheckBox
              value={defaultAddress}
              onValueChange={setDefaultAddress}
            />
            <JaraText size={14} weight="500" color={theme.colors.black_80}>
              Set As Default Address
            </JaraText>
          </View>

          <CustomButton
            type="linearGradient"
            title="Update Profile"
            onPress={handleUpdateProfile}
          />
        </View>
      </ScrollView>

      <SuccessAlertModal
        visible={modalVisible}
        title="Success"
        description="Profile updated successfully."
        buttonText="OK"
        onPressButton={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

// Section component with proper typing
const Section: React.FC<{
  title: string;
  rightText?: string;
  field: keyof ProfileType;
  icon?: React.ReactNode;
  multiline?: boolean;
  profile: ProfileType;
  editableField: string | null;
  onToggleEdit: (field: keyof ProfileType) => void;
  onChangeText: (field: keyof ProfileType, value: string) => void;
}> = ({
  title,
  field,
  icon,
  multiline = false,
  profile,
  editableField,
  rightText,
  onToggleEdit,
  onChangeText,
}) => {
  const isEditing = editableField === field;

  return (
    <View style={styles.sectionContainer}>
      <SectionTitle
        title={title}
        titleStyle={{
          fontSize: 16,
          fontWeight: "500",
          color: theme.colors.black,
        }}
        rightText={rightText}
        onRightPress={() => onToggleEdit(field)}
      />
      <TouchableOpacity
        onPress={() => onToggleEdit(field)}
        style={styles.profileField}
      >
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        {isEditing ? (
          <TextInput
            value={profile[field]}
            onChangeText={(text) => onChangeText(field, text)}
            style={styles.input}
            multiline={multiline}
            autoFocus
          />
        ) : (
          <JaraText size={14} weight="400" color={theme.colors.black_80}>
            {profile[field]}
          </JaraText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  profileImageContainer: {
    marginTop: 17,
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: width * 0.4,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.white1,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 32,
  },
  profileField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.foundation_white_active,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.foundation_green_light,
    borderRadius: 8,
    padding: 6,
    gap: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.black_80,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  mb: {
    marginBottom: 24,
  },
  genderPickerContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    marginTop: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  genderOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.foundation_white_light_hover,
  },
});

export default MyProfile;
