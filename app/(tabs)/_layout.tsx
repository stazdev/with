import { Tabs } from "expo-router";
import React from "react";

import TabBar from "@/components/TabBar";
export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="categoriesScreen"
        options={{
          title: "Categories",
        }}
      />
      <Tabs.Screen
        name="cartScreen"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="favoritesScreen"
        options={{
          title: "Favorites",
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: "Me",
        }}
      />
    </Tabs>
  );
}
