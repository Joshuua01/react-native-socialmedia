import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignInScreen from "./(auth)/sign-in";
import { Button, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

function HeaderRightButton() {
  const { id } = useLocalSearchParams();

  return (
    <Pressable
      onPress={() => {
        router.push(`posts/${id}/comments/create`);
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
            headerRight: () => <HeaderRightButton />,
          }}
        />
        <Stack.Screen
          name="albums/[id]/index"
          options={{
            headerShown: true,
            title: "Pictures",
            headerBackTitle: "Albums",
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
      </Stack>
    </ThemeProvider>
  );
}
