import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventTabRouter from "./EventTabRouter";

import WrappedAddEvent from "../pages/AddEvent";
// eventTabRouter
import EachEventDetailsTabRouter from "../../Event/routers/EachEventDetailsTabRouter";
import { useRoute } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import {RouteProp } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { EventTabRouterType } from "./EventTabRouter";
export type EventsStackRouterType = {
  EventsTab: undefined;
  EachEventDetails: {
    eventId:number, 
    eventName:string,
    eventDescription:string
    eventPicture:Object|undefined
    eventStart:string,
    eventEnd:string
  },
  AddEvent: undefined;

};

const Stack = createStackNavigator<EventsStackRouterType>();

const EventsStackRouter = () => {
  return (
    <Stack.Navigator initialRouteName="EventsTab" screenOptions={{
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { fontFamily: "noto-semibold", color: "#000"},
      headerTitleAlign: "center"
    }}>
      <Stack.Screen name="EventsTab"  options={{ headerShown: false}} component={EventTabRouter}></Stack.Screen>
      <Stack.Screen name="EachEventDetails" component={EachEventDetailsTabRouter} />
      <Stack.Screen name="AddEvent" component={WrappedAddEvent} options={{ title: "เพิ่มกิจกรรม" }}></Stack.Screen>

    </Stack.Navigator>
  );
};

export default EventsStackRouter;
