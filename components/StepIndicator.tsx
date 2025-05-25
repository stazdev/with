import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.stepIndicator}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            index + 1 <= currentStep ? styles.activeStep : styles.inactiveStep,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  step: {
    height: 4,
    borderRadius: 2,
    marginRight: 4,
    width: 30,
  },
  activeStep: {
    backgroundColor: theme.colors.foundation_pumpkin_normal,
  },
  inactiveStep: {
    backgroundColor: theme.colors.foundation_white_dark,
  },
});

export default StepIndicator;
