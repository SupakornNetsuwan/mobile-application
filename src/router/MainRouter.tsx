import React from "react";
import Landing from "../pages/Landing";
import Account from "../pages/Account";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StyledText, StyledView } from "../core/components/styled";
import { twMerge } from "tailwind-merge";

export type MainRouterType = {
  Landing: undefined;
  Account: undefined;
};

const BottomStack = createBottomTabNavigator<MainRouterType>();

const MainRouter = () => {
  return (
    <BottomStack.Navigator
      initialRouteName="Account"
      screenOptions={({ navigation, route }: BottomTabScreenProps<MainRouterType>) => {
        return {
          headerShown: false,
          tabBarActiveTintColor: "#B146C2",
          tabBarStyle: {
            height: 60,
          },
          tabBarLabelStyle: {
            paddingTop: 0,
            paddingBottom: 5,
          },
        };
      }}
    >
      <BottomStack.Screen
        component={Landing}
        name="Landing"
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText className={twMerge("text-sm p-0 m-0 text-gray-500", focused && "text-[#B146C2]")}>
              กิจกรรม
            </StyledText>
          ),
          tabBarIcon(props) {
            return <MaterialCommunityIcons name="calendar" {...props} />;
          },
        }}
      />
      <BottomStack.Screen
        component={Account}
        name="Account"
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText className={twMerge("text-sm p-0 m-0 text-gray-500", focused && "text-[#B146C2]")}>
              บัญชี
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
