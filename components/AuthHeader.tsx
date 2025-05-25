import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { JaraText, StepIndicator } from "@/components";
import { theme } from "@/constants/theme";
import CyberMonday from "@/assets/images/cyber_monday.png";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface AuthHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  image?: any; // Optional prop to allow passing a custom image
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  currentStep,
  totalSteps,
  title,
  description,
  image = CyberMonday, // Default to CyberMonday image if none is passed
}) => {
  const insets = useSafeAreaInsets(); // Hook to get safe area insets

  return (
    <SafeAreaView
      edges={[]}
      style={[styles.container, { paddingTop: insets.top * 1.5 }]}
    >
      <View style={styles.content}>
        <View>
          <MaskedView
            style={styles.stepText}
            maskElement={
              <Text style={styles.maskText}>
                Step {currentStep}/{totalSteps}
              </Text>
            }
          >
            <LinearGradient
              colors={["#FF2803", "#FF7508"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={{ opacity: 0 }}>
                Step {currentStep}/{totalSteps}
              </Text>
            </LinearGradient>
          </MaskedView>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <View>
            <JaraText
              size={28}
              weight="700"
              align="left"
              color={theme.colors.white}
              style={styles.title}
            >
              {title}
            </JaraText>
            <JaraText
              size={14}
              color={theme.colors.foundation_white_active}
              align="left"
              lineHeight={19.125}
              style={{ marginBottom: 20 }}
            >
              {description}
            </JaraText>
          </View>
        </View>
        <Image source={image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.foundation_green_normal,
    paddingLeft: 20,
  },
  stepText: {
    marginBottom: 10,
  },
  maskText: {
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginBottom: 8,
    marginTop: 32,
  },
});

export default AuthHeader;
