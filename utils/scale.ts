import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");

// Adjust this value to control font scaling
const BASE_WIDTH = 430;

export const scaleFont = (size: number) => {
  const scaleFactor = width / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};
