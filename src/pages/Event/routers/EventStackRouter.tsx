import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// pages
import ManageEvent from "./tabs/ManageEvent";
import EventDetails from "./tabs/EventDetails";
import EventPage from "../pages/EventPage";
export type EventDetailsTabRouterType = {
    EventDetails : undefined,
    ManageEvent : undefined
}

const EventDetailsTab = createMaterialTopTabNavigator<EventDetailsTabRouterType>()

const EventStackRouter = () =>{
    return (
        <>
            <EventDetailsTab.Navigator
                initialRouteName="EventDetails"
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#FAFAFA" },
                    tabBarItemStyle:{width:120},
                    tabBarLabelStyle: { fontFamily: "noto" },
                    tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                    tabBarBounces: true,
                    tabBarPressColor: "#f7e3fa",
                    tabBarScrollEnabled: true,
                  }}
            >
                <EventDetailsTab.Screen component={EventDetails} name="EventDetails" options={{ title: "กิจกรรม" }} />
                <EventDetailsTab.Screen component={ManageEvent} name="ManageEvent" options={{ title: "จัดการ" }} />
            </EventDetailsTab.Navigator>
        </>
    )
}

export default EventStackRouter