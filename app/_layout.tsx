import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Optional: Customize query behavior
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    AquireRegular: require("../assets/fonts/Aquire-BW0ox.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="welcomeScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/signupScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/signinScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/forgotPasswordScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/phoneVerificationScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/accountInformationScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/addressInformationScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="searchScreen"
              options={{ headerShown: false, presentation: "modal" }}
            />
            <Stack.Screen
              name="shippingAddressScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="addNewDeliveryAddressScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="promoScreen" options={{ headerShown: false }} />
            <Stack.Screen
              name="chooseDeliveryScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="checkoutScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="payOnlineScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(product)/productDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(store)/storeScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(store)/storeDetailScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(store)/reportStore"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/myProfile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/notifications"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/payment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/security"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/inviteFriend"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/customerSupport"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/privacyPolicy"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/termsAndConditions"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/changePin"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(profile)/changePassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(favorite)/favoriteItem"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(order)/orderScreen.tsx"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
