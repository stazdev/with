import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Control, Controller } from "react-hook-form";
import { theme } from "@/constants/theme";
import {
  EnvelopGreyIcon,
  InactiveEnvelopIcon,
  EnvelopIcon,
  FlagIcon,
  ChevronRightGreyIcon,
  ChevronDownIcon,
} from "@/assets/icons";
import JaraInput from "./JaraInput";
import JaraText from "./JaraText";
import { formatPhoneNumber } from "@/utils/formatter";
import { AddDeliveryAddressValues } from "@/interfaces/types";

interface AddNewDeliveryFormProps {
  control: Control<AddDeliveryAddressValues>;
  errors: Record<string, any>;
}

const { width } = Dimensions.get("window");
export const AddNewDeliveryForm: React.FC<AddNewDeliveryFormProps> = ({
  control,
  errors,
}) => {
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="First Name"
            variant="filled"
            placeholder="First Name"
            value={value}
            onChangeText={onChange}
            error={errors.firstName?.message}
            style={[styles.mb, errors.firstName ? styles.errorInput : {}]}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Last Name"
            variant="filled"
            placeholder="Last Name"
            value={value}
            onChangeText={onChange}
            error={errors.lastName?.message}
            style={[styles.mb, errors.lastName ? styles.errorInput : {}]}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Home Address"
            variant="filled"
            placeholder="Home Address"
            value={value}
            onChangeText={onChange}
            error={errors.address?.message}
            style={[styles.mb, errors.address ? styles.errorInput : {}]}
          />
        )}
      />

      <View style={[styles.mb]}>
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
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <JaraInput
                variant="filled"
                placeholder="Phone Number"
                value={formatPhoneNumber(value)}
                onChangeText={(text) => onChange(formatPhoneNumber(text))}
                error={errors.phone?.message}
                style={[{ flex: 1 }, errors.phone ? styles.errorInput : {}]}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Email"
            variant="filled"
            placeholder="Your Email Address"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
            style={[styles.mb, errors.email ? styles.errorInput : {}]}
          />
        )}
      />

      <Controller
        control={control}
        name="postCode"
        render={({ field: { onChange, value } }) => (
          <JaraInput
            label="Post Code"
            variant="filled"
            placeholder="Postal Code"
            value={value}
            onChangeText={onChange}
            error={errors.postCode?.message}
            style={[styles.mb, errors.postCode ? styles.errorInput : {}]}
          />
        )}
      />

      <View
        style={[
          styles.mb,
          { flexDirection: "row", gap: 16, alignItems: "center" },
        ]}
      >
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: "column", width: width / 2 - 24 }}>
              <JaraText
                size={16}
                weight="500"
                color={theme.colors.black}
                style={{ marginBottom: 12 }}
              >
                City
              </JaraText>
              <JaraInput
                variant="filled"
                placeholder="City"
                value={value}
                onChangeText={onChange}
                error={errors.city?.message}
                rightIcon={<ChevronDownIcon />}
                style={errors.city ? styles.errorInput : {}}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: "column", width: width / 2 - 24 }}>
              <JaraText
                size={16}
                weight="500"
                color={theme.colors.black}
                style={{ marginBottom: 12 }}
              >
                Country
              </JaraText>
              <JaraInput
                variant="filled"
                placeholder="Country"
                value={value}
                onChangeText={onChange}
                error={errors.country?.message}
                rightIcon={<ChevronDownIcon />}
                style={errors.country ? styles.errorInput : {}}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 16,
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
  errorInput: {
    borderColor: theme.colors.foundation_pumpkin_normal,
    borderWidth: 1,
  },
  mb: {
    marginBottom: 24,
  },
});
