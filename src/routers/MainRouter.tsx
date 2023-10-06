import React from "react";
import Events from "../pages/Events";
import AccountStackRouter from "../pages/Account";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StyledText } from "../core/components/styled";
import { twMerge } from "tailwind-merge";
import Loading from "../core/components/Loading";
import useAuthen from "../core/hooks/useAuthen";
import SignIn from "../pages/SignIn";
import EventDetails from "../pages/Event/pages/EventPage";
export type MainRouterType = {
  Landing: undefined;
  AccountStackRouter: undefined;
  EventDetails:undefined
};

const BottomStack = createBottomTabNavigator<MainRouterType>();

const MainRouter = () => {
  const auth = useAuthen();

  if (auth.status === "loading") return <Loading />;
  if (auth.status === "unauthenticated") return <SignIn />;

  return (
    <BottomStack.Navigator
      initialRouteName="Landing"
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
        name="Landing"
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
      <BottomStack.Screen
        component={EventDetails}
        name="EventDetails"
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
      />
    </BottomStack.Navigator>
  );
};

export default MainRouter;
