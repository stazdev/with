import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { JaraText } from './JaraText';
import { CustomButton } from './CustomButton';
import { theme } from '@/constants/theme'; // Assuming theme is used for styling

interface GuestPlaceholderScreenProps {
  icon?: ReactNode;
  messageTitle: string;
  messageBody: string;
  buttonText: string;
  onButtonPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  messageTitleStyle?: StyleProp<ViewStyle>;
  messageBodyStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
}

const GuestPlaceholderScreen: React.FC<GuestPlaceholderScreenProps> = ({
  icon,
  messageTitle,
  messageBody,
  buttonText,
  onButtonPress,
  containerStyle,
  iconContainerStyle,
  messageTitleStyle,
  messageBodyStyle,
  buttonContainerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <View style={[styles.iconContainer, iconContainerStyle]}>{icon}</View>}
      <JaraText type="heading" style={[styles.messageTitle, messageTitleStyle]}>
        {messageTitle}
      </JaraText>
      <JaraText type="body" style={[styles.messageBody, messageBodyStyle]}>
        {messageBody}
      </JaraText>
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <CustomButton title={buttonText} onPress={onButtonPress} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background, // Example background color
  },
  iconContainer: {
    marginBottom: 24,
    alignItems: 'center', // Center icon if it's smaller than container
  },
  messageTitle: {
    fontSize: 22, // Example size
    fontWeight: 'bold', // Handled by JaraText type="heading" potentially
    textAlign: 'center',
    marginBottom: 12,
    color: theme.colors.text, // Example text color
  },
  messageBody: {
    fontSize: 16, // Example size
    textAlign: 'center',
    marginBottom: 24,
    color: theme.colors.neutral_dark_grey, // Example secondary text color
    lineHeight: 24, // Example line height
  },
  buttonContainer: {
    width: '80%', // Make button take a good portion of width
    maxWidth: 300, // Max width for larger screens
  },
});

export default GuestPlaceholderScreen;
