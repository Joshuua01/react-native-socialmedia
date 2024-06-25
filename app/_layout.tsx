import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function HeaderRightButton(start: string, end: string) {
  const { id } = useLocalSearchParams();
  const link = start + id + end;
  return (
    <Pressable
      onPress={() => {
        router.push(link);
      }}
    >
      <FontAwesome name="plus" size={24} color="white" />
    </Pressable>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="posts/[id]/index"
          options={{
            headerShown: true,
            title: "Post",
            headerBackTitle: "Feed",
            headerRight: () => HeaderRightButton("posts/", "/comments/create"),
          }}
        />
        <Stack.Screen
          name="albums/[id]/index"
          options={{
            headerShown: true,
            title: "Pictures",
            headerBackTitle: "Albums",
            headerRight: () => HeaderRightButton("albums/", "/pictures/create/"),
          }}
        />
        <Stack.Screen
          name="posts/create/index"
          options={{
            headerShown: true,
            title: "Add Post",
            headerBackTitle: "Posts",
          }}
        />
        <Stack.Screen
          name="posts/[id]/comments/create/index"
          options={{
            headerShown: true,
            title: "Add Comment",
            headerBackTitle: "Post",
          }}
        />
        <Stack.Screen
          name="posts/[id]/edit/index"
          options={{
            headerShown: true,
            title: "Edit Post",
            headerBackTitle: "Post",
          }}
        />
        <Stack.Screen
          name="posts/[id]/comments/[commentId]/edit/index"
          options={{
            headerShown: true,
            title: "Edit Comment",
            headerBackTitle: "Post",
          }}
        />
        <Stack.Screen
          name="albums/create/index"
          options={{
            headerShown: true,
            title: "Add Album",
            headerBackTitle: "Albums",
          }}
        />
        <Stack.Screen
          name="albums/[id]/edit/index"
          options={{
            headerShown: true,
            title: "Edit Album",
            headerBackTitle: "Album",
          }}
        />
        <Stack.Screen
          name="albums/[id]/pictures/create/index"
          options={{
            headerShown: true,
            title: "Add Picture",
            headerBackTitle: "Album",
          }}
        />
        <Stack.Screen
          name="todos/[id]/edit/index"
          options={{
            headerShown: true,
            title: "Edit Todo",
            headerBackTitle: "Todos",
          }}
        />
        <Stack.Screen
          name="todos/create/index"
          options={{
            headerShown: true,
            title: "Add Todo",
            headerBackTitle: "Todos",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
