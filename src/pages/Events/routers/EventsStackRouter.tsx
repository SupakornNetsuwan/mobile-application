import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventTabRouter from "./EventTabRouter";
import AddEvent from "../pages/AddEvent";
import Event from "../../Event";

export type EventsStackRouterType = {
  EventTabRouter: undefined; // ส่วนที่ไว้ดูข้อมูลหลัก
  AddEvent: undefined; // ส่วนที่เอาไว้เพิ่มกิจกรรม
  Event: undefined;
};

const Stack = createStackNavigator<EventsStackRouterType>();

const EventsStackRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="EventTabRouter"
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontFamily: "noto-semibold", color: "#000" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="EventTabRouter" component={EventTabRouter} options={{ headerShown: false }} />
      <Stack.Screen name="AddEvent" component={AddEvent} options={{ title: "เพิ่มกิจกรรม" }} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
};

export default EventsStackRouter;
