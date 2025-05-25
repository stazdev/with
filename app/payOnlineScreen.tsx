import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { JaraText } from "@/components";

const PayOnlineScreen: React.FC = () => {
  const { checkoutUrl } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <JaraText size={20} weight="700" lineHeight={24} color="black">
          Pay Online
        </JaraText>
      </View>
      <WebView source={{ uri: checkoutUrl as string }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.foundation_white_light_hover,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.black_20,
    borderBottomWidth: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PayOnlineScreen;
