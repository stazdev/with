import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

interface JaraModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  scrollable?: boolean;
  initialSnapPoint?: string;
  maxSnapPoint?: string;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
}

const JaraModal: React.FC<JaraModalProps> = ({
  isVisible,
  onClose,
  children,
  scrollable = false,
  initialSnapPoint = "50%",
  maxSnapPoint = "70%",
  containerStyle,
  contentContainerStyle,
  style,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom } = useSafeAreaInsets();

  const snapPoints = useMemo(
    () => [initialSnapPoint, maxSnapPoint],
    [initialSnapPoint, maxSnapPoint]
  );

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const ContentWrapper = scrollable ? BottomSheetScrollView : BottomSheetView;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={[styles.background, containerStyle]}
    >
      <ContentWrapper
        showsVerticalScrollIndicator={false}
        style={[styles.contentContainer, contentContainerStyle]}
        contentContainerStyle={[{ paddingBottom: bottom }, style]}
      >
        {children}
      </ContentWrapper>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.white, // Use theme colors
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
  headerMiddle: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // marginHorizontal: 16,
  },
  indicator: {
    backgroundColor: theme.colors.gery1, // Use theme colors
    width: 80,
  },
});

export default JaraModal;
