import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { LanguageProvider } from "../utils/LanguageContext";
// import "react-native-reanimated"; // Commented out - requires development build

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // Force light theme as default, only use dark if explicitly set
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <LanguageProvider>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen
            name="course/[id]"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </LanguageProvider>
  );
}
