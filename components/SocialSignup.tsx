import React from "react";
import { View, StyleSheet } from "react-native";
import { JaraText, SocialButton } from "@/components";
import { Google, Facebook, Apple, Arrow2, Arrow1 } from "@/assets/icons";
import { theme } from "@/constants/theme";

const SocialSignup: React.FC = () => {
  return (
    <>
      <View style={styles.divider}>
        <Arrow1 width={100} />
        <JaraText
          align="center"
          color={theme.colors.foundation_green_normal}
          size={14}
          weight="600"
          style={styles.orText}
          lineHeight={24}
        >
          Or Continue With
        </JaraText>
        <Arrow2 width={100} />
      </View>

      <View style={styles.socialButtons}>
        <View style={styles.buttonWrapper}>
          <SocialButton
            imageSource={<Google />}
            buttonText="Google"
            onPress={() => {}}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SocialButton
            imageSource={<Facebook />}
            buttonText="Facebook"
            onPress={() => {}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    marginBottom: 50,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    width: "100%",
    alignSelf: "center",
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SocialSignup;
