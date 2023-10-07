import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// pages
import ManageEvent from "./tabs/ManageEvent";
import EventDetails from "./tabs/EventDetails";
export type EventDetailsTabRouterType = {
    EventDetails : undefined,
    ManageEvent : undefined
}

import { Text } from "react-native";

const EventDetailsTab = createMaterialTopTabNavigator<EventDetailsTabRouterType>()

const EventStackRouter = ({user}:{user:string}) =>{
    return (
        <>
            <EventDetailsTab.Navigator
                initialRouteName="EventDetails"
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#FAFAFA"},
                    tabBarItemStyle:{
                        width: user == "admin"? 200 : "100%"},
                    tabBarLabelStyle: { fontFamily: "noto", textAlign:'center', flex:1 },
                    tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                    tabBarBounces: true,
                    tabBarPressColor: "#f7e3fa",
                    tabBarScrollEnabled: true,
                    tabBarActiveTintColor:"grey",
                    tabBarInactiveTintColor:"black",
                    
                  }}
            >
                <EventDetailsTab.Screen component={EventDetails} name="EventDetails" options={{ title: "กิจกรรม" }} />
                {user === "admin" && (
                    <EventDetailsTab.Screen component={ManageEvent} name="ManageEvent" options={{ title: "จัดการ" }} />
                )}
            </EventDetailsTab.Navigator>
        </>
    )
}

export default EventStackRouter