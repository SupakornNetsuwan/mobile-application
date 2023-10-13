import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventTabRouter from "./EventTabRouter";
import WrappedAddEvent from "../pages/AddEvent";

export type EventsStackRouterType = {
  Events: undefined;
  AddEvent: undefined;
};

const Stack = createStackNavigator<EventsStackRouterType>();

const EventsStackRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Events" screenOptions={{
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { fontFamily: "noto-semibold", color: "#000"},
      headerTitleAlign: "center"
    }}>
      <Stack.Screen name="Events" component={EventTabRouter} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="AddEvent" component={WrappedAddEvent} options={{ title: "เพิ่มกิจกรรม" }}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default EventsStackRouter