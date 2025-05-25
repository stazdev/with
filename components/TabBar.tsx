import {
  CategoryActiveIcon,
  CategoryInactiveIcon,
  FavoriteActiveIcon,
  FavoriteInactiveIcon,
  HomeActiveIcon,
  HomeInactiveIcon,
  ProfileActiveIcon,
  ProfileInactiveIcon,
  TabCartIcon,
} from "@/assets/icons";
import {
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import JaraText from "./JaraText";
import { theme } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("screen");

export let TabIcon = (name: string, focused: boolean) => {
  switch (name) {
    case "Home":
      return focused ? <HomeActiveIcon /> : <HomeInactiveIcon />;
    case "Categories":
      return focused ? <CategoryActiveIcon /> : <CategoryInactiveIcon />;
    case "Cart":
      return <TabCartIcon />;
    case "Favorites":
      return focused ? <FavoriteActiveIcon /> : <FavoriteInactiveIcon />;
    case "Me":
      return focused ? <ProfileActiveIcon /> : <ProfileInactiveIcon />;
  }
};

function TabBar({ state, descriptors, navigation }: any) {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        width,
        height: 100,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.foundation_green_normal,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingBottom: Platform.OS === "ios" ? 0 : inset.bottom,
      }}
    >
      {state.routes.map(
        (
          route: { key: string | number; name: any; params: any },
          index: any
        ) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              activeOpacity={0.95}
              key={route.key}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 27,
                  paddingBottom: 14,
                  rowGap: 8,

                  position: route.name === "cartScreen" ? "relative" : "static",
                }}
              >
                {/* Floating Cart Icon styling */}
                {route.name === "cartScreen" ? (
                  <View
                    style={{
                      position: "absolute",
                      top: -30,
                      backgroundColor: "#fff",
                      borderRadius: 32,
                      padding: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 20,
                    }}
                  >
                    {TabIcon(label, isFocused)}
                  </View>
                ) : (
                  <>
                    {TabIcon(label, isFocused)}
                    <JaraText
                      size={16}
                      weight="600"
                      color={
                        isFocused
                          ? "#FF7508" // Focused color for other tabs
                          : theme.colors.white
                      }
                    >
                      {route.name === "cartScreen" ? "" : label}{" "}
                      {/* No label for Cart */}
                    </JaraText>
                  </>
                )}
              </View>
            </TouchableOpacity>
          );
        }
      )}
    </SafeAreaView>
  );
}

export default TabBar;
