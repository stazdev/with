import { theme } from "@/constants/theme";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Props for the entire card component
interface AddressCardProps {
  LeftComponent: React.ReactNode;
  RightComponent: React.ReactNode;
  textContent: React.ReactNode;
  containerStyle?: object;
  onPress?: () => void;
}

const AddressCard = ({
  LeftComponent,
  RightComponent,
  textContent,
  containerStyle,
  onPress,
}: AddressCardProps) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderColor: "transparent",
        marginBottom: 8,
        borderRadius: 16,
        shadowColor: theme.colors.black_20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flex: 0.7,
        }}
      >
        {/* Left component container */}
        <View>{LeftComponent}</View>

        {/* Text column */}
        <View>{textContent}</View>
      </View>

      {/* Right component */}
      <TouchableOpacity onPress={onPress} style={{ alignContent: "flex-end" }}>
        {RightComponent}
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;
