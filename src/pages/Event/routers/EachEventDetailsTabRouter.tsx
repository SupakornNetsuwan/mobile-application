
import { createMaterialTopTabNavigator, } from "@react-navigation/material-top-tabs";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
//router
import ManageStackRouter from "./ManageStackRouter";
import PostStackRouter from "./PostStackRouter";
import { EventsStackRouterType } from "../../Events/routers/EventsStackRouter";
import useAuthen from "../../../core/hooks/useAuthen";
import { useMemo } from "react";
import { ManageStackRouterType } from "./ManageStackRouter";
import useGetEvent from "../../../core/hooks/useGetEvent";
import { StyledText } from "../../../core/components/styled";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

export type RootEachEventDetailsTabRouterList = {
    // EachEventDetails รับ สองอย่างคือ eventId , กับเช็คว่าคนที่เข้าเป็น adminไหม
    InEventDetails: {
        eventId: number,
    },
    ManageStackRouter: undefined,
}


type Props = {
    route: RouteProp<EventsStackRouterType, 'EachEventDetails'>;
    navigation: StackNavigationProp<EventsStackRouterType, 'EachEventDetails'>
}
// type Props  = MaterialTopTabNavigationProp<RootEventDetailsTabRouterList, "PostStackRouter">
const EventDetailsTab = createMaterialTopTabNavigator<RootEachEventDetailsTabRouterList>()
type ManageStackRouterRouteType = RouteProp<ManageStackRouterType, 'ManageEvent'>;
type ManageStackRouterNavigationType = StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
const EachEventDetailsTabRouter = ({ route, navigation }: Props) => {
    const eventId = route.params.eventId;

    const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(eventId)!;

    const event = useMemo(() => eventData?.data.data, [eventData?.data.data])!;

    const auth = useAuthen();

    if (eventIsLoading || auth.status == "loading") {
        return <LoadingActivityindicator />
    }

    const eventName = event.attributes.name;
    const eventOwnerId = event.attributes.owner.data.id;

    let ownerEvent = false; // Declare ownerEvent

    if (auth.status === "authenticated") {
        if (auth.session.user.id == eventOwnerId) {
            ownerEvent = true;
        }
    }

    // useEffect(() => {
    //     navigation.setOptions({ headerTitle: eventName });
    // }, [route]);

    return (
        <>
            <EventDetailsTab.Navigator
                initialRouteName="InEventDetails"
                screenOptions={{
                    tabBarLabelStyle: { fontFamily: "noto-semibold", fontSize: 16 },
                    tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                    tabBarActiveTintColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                    tabBarInactiveTintColor: "#9e9e9e",
                }}
            >
                <EventDetailsTab.Screen
                    name="InEventDetails"
                    options={{ title: "กิจกรรม" }}
                >
                    {/* คิดว่าส่งเป็น params ได้ ไม่จำเป็นค้องใช้ props แต่ลองไว้เล่นเดียวแก้*/}
                    {(props) => <PostStackRouter {...props}
                        route={props.route}
                        navigation={props.navigation}
                        eventId={eventId} />}
                </EventDetailsTab.Screen>
                {ownerEvent && (
                    <EventDetailsTab.Screen name="ManageStackRouter" options={{ title: "จัดการ" }} >
                        {(props) => <ManageStackRouter {...props as unknown as ManageStackRouterRouteType}
                            route={props.route as unknown as ManageStackRouterRouteType}
                            navigation={props.navigation as unknown as ManageStackRouterNavigationType}
                            eventId={eventId}
                        />}
                    </EventDetailsTab.Screen>
                )}
            </EventDetailsTab.Navigator>
        </>
    )
}

export default EachEventDetailsTabRouter