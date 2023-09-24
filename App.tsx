import React, { useCallback, useEffect } from "react";
import MainRouter from "./src/router/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

// ฟังก์ชันสำหรับเอาหน้าโหลดออก
const onLayoutRootView = async () => {
  await SplashScreen.hideAsync();
};

const queryClient = new QueryClient();

const App = () => {
  const [fontsLoaded] = useFonts({
    noto: require("./assets/fonts/NotoSansThai-Regular.ttf"),
    "noto-medium": require("./assets/fonts/NotoSansThai-Medium.ttf"),
    "noto-semibold": require("./assets/fonts/NotoSansThai-SemiBold.ttf"),
    "noto-bold": require("./assets/fonts/NotoSansThai-Bold.ttf"),
  });

  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("กำลังดาวน์โหลดฟอนต์...");
    return null;
  }

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
