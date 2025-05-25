declare module "react-native-snap-carousel" {
  import { ViewStyle } from "react-native";
  export const Pagination: React.FC<{
    dotsLength: number;
    activeDotIndex: number;
    containerStyle?: ViewStyle;
    dotStyle?: ViewStyle;
    inactiveDotStyle?: ViewStyle;
  }>;
}
