import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Events from "../tabs/Events";
import Following from "../tabs/Following";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import withSafeArea from "../../../core/components/HOC/withSafeArea";

export type EventTabRouterType = {
  Events: undefined;
  Following: undefined;
};

const EventTab = createMaterialTopTabNavigator<EventTabRouterType>();

const EventTabRouter = () => {
  return (
    <EventTab.Navigator
      initialRouteName="Events"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#FAFAFA" },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: { fontFamily: "noto" },
        tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
        tabBarPressColor: "#f7e3fa",
      }}
      tabBar={(props) => {
        return <TabBar {...props} />;
      }}
      sceneContainerStyle={{ backgroundColor: "white", padding: 12 }}
    >
      <EventTab.Screen
        name="Events"
        key="Events"
        component={Events}
        options={({ navigation, route }) => ({
          title: "กิจกรรม",
          tabBarIcon(props) {
            return <MaterialCommunityIcons size={20} name="calendar" {...props} />;
          },
        })}
      />
      <EventTab.Screen
        name="Following"
        key="Following"
        component={Following}
        options={({ navigation, route }) => ({
          title: "ที่ถูกใจ",
          tabBarIcon(props) {
            return <MaterialCommunityIcons size={20} name="calendar" {...props} />;
          },
        })}
      />
    </EventTab.Navigator>
  );
};

export default EventTabRouter;
