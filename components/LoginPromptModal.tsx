import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { JaraText } from './JaraText'; // Assuming JaraText is in the same directory
import { CustomButton } from './CustomButton'; // Assuming CustomButton is in the same directory
import { router } from 'expo-router';

interface LoginPromptModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  isVisible,
  onClose,
  title = "Account Required",
  message = "Please log in or sign up to access this feature.",
}) => {
  const handleLoginPress = () => {
    router.push('/(auth)/signinScreen');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <JaraText style={styles.titleText} type="heading">
            {title}
          </JaraText>
          <JaraText style={styles.messageText} type="body">
            {message}
          </JaraText>
          <CustomButton
            title="Login / Sign Up"
            onPress={handleLoginPress}
            variant="primary" // Assuming CustomButton has a variant prop
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <JaraText style={styles.closeButtonText} type="link">Close</JaraText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#007bff', // Example link color
  },
});

export default LoginPromptModal;
