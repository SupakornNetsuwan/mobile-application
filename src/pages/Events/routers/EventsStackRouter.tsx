import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventTabRouter from "./EventTabRouter";

import WrappedAddEvent from "../pages/AddEvent";
import EachEventDetailsTabRouter from "../../Event/routers/EachEventDetailsTabRouter";
export type EventsStackRouterType = {
  Events: undefined;
  EachEventDetails: {
    eventId: number,
    eventName: string,
    eventDescription: string
    eventPicture: Object | undefined
    eventStart: string,
    eventEnd: string,
    eventOwnerId: string
  },
  AddEvent: undefined;

};

const Stack = createStackNavigator<EventsStackRouterType>();

const EventsStackRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Events" screenOptions={{
      headerStyle: { backgroundColor: "white"},
      headerTitleStyle: { fontFamily: "noto-semibold", color: "#000" },
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
      headerTintColor: "black",
    }}>
      <Stack.Screen name="Events" options={{ headerShown: false }} component={EventTabRouter}></Stack.Screen>
      <Stack.Screen name="EachEventDetails" component={EachEventDetailsTabRouter} />
      <Stack.Screen name="AddEvent" component={WrappedAddEvent} options={{ title: "เพิ่มกิจกรรม" }}></Stack.Screen>

    </Stack.Navigator>
  );
};

export default EventsStackRouter;
