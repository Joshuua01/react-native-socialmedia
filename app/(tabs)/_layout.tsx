import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs, router } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { user } = useAuth();

  if (user === null) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <TabBarIcon name="rss" color={color} />,
          headerRight: () => (
            <FontAwesome
              name="plus"
              size={24}
              color={"white"}
              style={{ marginRight: 10 }}
              onPress={() => {
                router.push("/posts/create");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="albums"
        options={{
          title: "Albums",
          tabBarIcon: ({ color }) => <TabBarIcon name="image" color={color} />,
          headerRight: () => (
            <FontAwesome
              name="plus"
              size={24}
              color={"white"}
              style={{ marginRight: 10 }}
              onPress={() => {
                router.push("/albums/create");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ol" color={color} />,
          headerRight: () => (
            <FontAwesome
              name="plus"
              size={24}
              color={"white"}
              style={{ marginRight: 10 }}
              onPress={() => {
                router.push("/todos/create");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
