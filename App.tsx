import React, { useEffect } from "react";
import MainRouter from "./src/routers/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "./src/core/providers/AuthProvider";
import Toast from "react-native-toast-message";
import toastConfig from "./src/utils/toastConfig";

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
    "noto-extrabold": require("./assets/fonts/NotoSansThai-ExtraBold.ttf"),
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
        <AuthProvider>
          <MainRouter />
          <Toast config={toastConfig} />
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
