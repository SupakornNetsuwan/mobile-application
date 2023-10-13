import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Events from "../pages/Events";
import Following from "../pages/Following";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import withSafeArea from "../../../core/components/HOC/withSafeArea";
import EventsStackRouter from "./EventsStackRouter";

export type EventTabRouterType = {
  EventsTab: undefined;
  Following: undefined;
};

const EventTab = createMaterialTopTabNavigator<EventTabRouterType>();

const EventTabRouter = () => {
  return (
    <EventTab.Navigator
      initialRouteName="EventsTab"
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
        name="EventsTab"
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
          title: "กำลังเข้าร่วม",
          tabBarIcon(props) {
            return <MaterialCommunityIcons size={20} name="calendar" {...props} />;
          },
        })}
      />
    </EventTab.Navigator>
  );
};

export default EventTabRouter;
