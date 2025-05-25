import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  SafeAreaView,
} from "react-native";
import { Control, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "@/constants/theme";
import {
  PersonGreyIcon,
  PersonActiveIcon,
  CalendarGreyIcon,
  CalendarActiveIcon,
  GenderGreyIcon,
  GenderActiveIcon,
  DropDownIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";
import JaraText from "./JaraText";
import { AccountInfoFormValues } from "@/interfaces/types";

interface AccountInfoFormProps {
  control: Control<AccountInfoFormValues>;
  errors: any;
}

export const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  control,
  errors,
}) => {
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const genderOptions = ["Male", "Female"];

  const formatDate = (date: Date) => {
    if (!date) return "";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (control?.setValue) {
      control.setValue("dob", formatDate(selectedDate));
    }
  }, [selectedDate, control]);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setDatePickerVisible(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.form}>
      {/* Full Name Input */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <JaraInput
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
              icon={<PersonGreyIcon />}
              onFocusIcon={<PersonActiveIcon />}
              validatedIcon={<PersonActiveIcon />}
              style={errors.fullName ? styles.errorInput : {}}
            />
          </View>
        )}
      />

      {/* Date of Birth Input */}
      <Controller
        control={control}
        name="dob"
        render={({ field: { value, onChange } }) => (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              activeOpacity={0.7}
            >
              <JaraInput
                placeholder="Date of Birth"
                value={value || formatDate(selectedDate)}
                error={errors.dob?.message}
                icon={<CalendarGreyIcon />}
                onFocusIcon={<CalendarActiveIcon />}
                validatedIcon={<CalendarActiveIcon />}
                style={errors.dob ? styles.errorInput : {}}
                editable={false}
                rightIcon={<DropDownIcon />}
                onPress={() => setDatePickerVisible(true)}
              />
            </TouchableOpacity>

            {/* Date Picker Modal for both iOS and Android */}
            {datePickerVisible && (
              <Modal
                transparent={true}
                visible={datePickerVisible}
                animationType="slide"
                onRequestClose={() => setDatePickerVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.datePickerContainer}>
                    {Platform.OS === "ios" && (
                      <View style={styles.datePickerHeader}>
                        <TouchableOpacity
                          onPress={() => setDatePickerVisible(false)}
                          style={styles.headerButton}
                        >
                          <JaraText
                            size={16}
                            weight="500"
                            color={theme.colors.black}
                          >
                            Cancel
                          </JaraText>
                        </TouchableOpacity>
                        <JaraText
                          size={16}
                          weight="600"
                          color={theme.colors.black}
                        >
                          Choose Date
                        </JaraText>
                        <TouchableOpacity
                          onPress={() => {
                            onChange(formatDate(selectedDate)); // Update the form value
                            setDatePickerVisible(false);
                          }}
                          style={styles.headerButton}
                        >
                          <JaraText
                            size={16}
                            weight="600"
                            color={theme.colors.primary}
                          >
                            Done
                          </JaraText>
                        </TouchableOpacity>
                      </View>
                    )}

                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, date) => {
                        if (date) {
                          setSelectedDate(date); // Update the selected date
                        }
                      }}
                      style={styles.datePicker}
                      textColor={theme.colors.black}
                    />

                    {Platform.OS === "android" && (
                      <View style={styles.androidButtonContainer}>
                        <TouchableOpacity
                          style={styles.androidButton}
                          onPress={() => {
                            onChange(formatDate(selectedDate)); // Update the form value
                            setDatePickerVisible(false);
                          }}
                        >
                          <JaraText
                            size={16}
                            weight="500"
                            color={theme.colors.white}
                          >
                            Confirm
                          </JaraText>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </Modal>
            )}
          </View>
        )}
      />

      {/* Gender Input */}
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => setGenderModalVisible(true)}
              activeOpacity={0.7}
            >
              <JaraInput
                placeholder="Gender"
                value={value}
                error={errors.gender?.message}
                icon={<GenderGreyIcon />}
                onFocusIcon={<GenderActiveIcon />}
                validatedIcon={<GenderActiveIcon />}
                style={errors.gender ? styles.errorInput : {}}
                rightIcon={<DropDownIcon />}
                editable={false}
                onPress={() => setGenderModalVisible(true)}
              />
            </TouchableOpacity>

            {/* Gender Selection Modal */}
            <Modal
              transparent={true}
              visible={genderModalVisible}
              animationType="fade"
              onRequestClose={() => setGenderModalVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setGenderModalVisible(false)}
              >
                <View style={styles.genderDropdown}>
                  {genderOptions.map((gender, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.genderOption,
                        index < genderOptions.length - 1 &&
                          styles.genderOptionBorder,
                        value === gender && styles.selectedOption,
                      ]}
                      onPress={() => {
                        onChange(gender);
                        setGenderModalVisible(false);
                      }}
                    >
                      <JaraText
                        size={16}
                        weight={value === gender ? "600" : "400"}
                        color={
                          value === gender
                            ? theme.colors.primary
                            : theme.colors.black
                        }
                      >
                        {gender}
                      </JaraText>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
    gap: 24,
    padding: 16,
    flexGrow: 1,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 8,
  },
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  genderDropdown: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    width: "80%",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  genderOption: {
    padding: 16,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "rgba(255, 117, 8, 0.05)",
  },
  genderOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  datePickerContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    width: Platform.OS === "ios" ? "90%" : "80%",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerButton: {
    padding: 8,
  },
  datePicker: {
    height: Platform.OS === "ios" ? 200 : "auto",
    width: "100%",
  },
  androidButtonContainer: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  androidButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default AccountInfoForm;
