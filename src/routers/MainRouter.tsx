import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StyledText } from "../core/components/styled";
import { twMerge } from "tailwind-merge";
import useAuthen from "../core/hooks/useAuthen";
// pages
import Events from "../pages/Events";
import AccountStackRouter from "../pages/Account";
import Loading from "../core/components/Loading";
import SignIn from "../pages/SignIn";
// import EventTabRouter from "../pages/Event/";

export type MainRouterType = {
  Events: undefined;
  AccountStackRouter: undefined;
  // EventTabRouter: undefined;
};

const BottomStack = createBottomTabNavigator<MainRouterType>();

const MainRouter = () => {
  const auth = useAuthen();

  if (auth.status === "loading") return <Loading />;
  if (auth.status === "unauthenticated") return <SignIn />;

  return (
    <BottomStack.Navigator
      initialRouteName="Events"
      screenOptions={({ navigation, route }: BottomTabScreenProps<MainRouterType>) => {
        return {
          headerShown: false,
          tabBarActiveTintColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
          tabBarStyle: {},
          tabBarLabelStyle: {
            paddingTop: 0,
            paddingBottom: 5,
          },
        };
      }}
    >
      <BottomStack.Screen
        component={Events}
        name="Events"
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText className={twMerge("text-sm p-0 m-0 text-gray-500", focused && "text-purple-primary")}>
              กิจกรรม
            </StyledText>
          ),
          tabBarIcon(props) {
            return <MaterialCommunityIcons name="calendar" {...props} />;
          },
        }}
      />
      <BottomStack.Screen
        component={AccountStackRouter}
        name="AccountStackRouter"
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText className={twMerge("text-sm p-0 m-0 text-gray-500", focused && "text-purple-primary")}>
              บัญชี
            </StyledText>
          ),
          tabBarIcon(props) {
            return <MaterialCommunityIcons name="account" {...props} />;
          },
        }}
      />
      {/* <BottomStack.Screen
        component={EventTabRouter}
        name="EventTabRouter"
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText className={twMerge("text-sm p-0 m-0 text-gray-500", focused && "text-purple-primary")}>
              รายละเอียดกิจกรรม
            </StyledText>
          ),
          tabBarIcon(props) {
            return <MaterialCommunityIcons name="account" {...props} />;
          },
        }}
      /> */}
    </BottomStack.Navigator>
  );
};

export default MainRouter;
