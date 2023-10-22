import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "../components/TabBar";
import withSafeArea from "../../../core/components/HOC/withSafeArea";
import Events from "../pages/Events";
import Following from "../pages/Following";
export type EventTabRouterType = {
  EventsTopTab: undefined;
  Following: undefined;
};

const EventTab = createMaterialTopTabNavigator<EventTabRouterType>();

const EventTabRouter = () => {


  return (
    <EventTab.Navigator
      initialRouteName="EventsTopTab"
      tabBar={(props) => {
        // เราไม่จำเป็นต้องใช้ screenOptions แล้วเพราะ render entirely custom component
        return <TabBar {...props} />;
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <EventTab.Screen
        name="EventsTopTab"
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
