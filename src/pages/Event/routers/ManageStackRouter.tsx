import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack"
//pages
import WrappedEditStaff from "../pages/manage/EditStaff";
import ManageEvent from "./tabs/ManageEvent";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import WrappedEditEvent from "../../Events/pages/EditEvent";
type PictureType = {
    attributes: {
        url: string
    }
}
type staffType = {
    attributes: {
        url: string
    } | undefined,
}
export type ManageStackRouterType = {
    ManageEvent: {
        eventId: number,
        eventName: string,
        eventDescription: string,
        eventPicture: Object | undefined,
        eventStart: string,
        eventEnd: string,
        eventOwnerId: string,
    }
    EditStaff: {
        eventId: number | undefined,
        eventName: string | undefined,
        eventDescription: string | undefined,
        eventPicture: PictureType | undefined,
        staffDuty: string | undefined,
        staffPosition: string | undefined,
        staffPicture: staffType | undefined
        staffUsername: string | undefined,
        staffStudentId: string | undefined,
        staffId: string | undefined
    },
    EditEvent: {
        eventId: number | undefined
    }
}
const Stack = createStackNavigator<ManageStackRouterType>()

type ManageStackRouterProp = {
    route: RouteProp<ManageStackRouterType, 'ManageEvent'>
    navigation: StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
    eventId: number,
    // eventName: string
    // eventDescription: string
    // eventPicture: Object | undefined
    // eventStart: string,
    // eventEnd: string
}

const ManageStackRouter = ({ route, navigation, eventId }: ManageStackRouterProp) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    
    React.useLayoutEffect(() => {
        if (routeName === "EditEvent") {
            // @ts-ignore
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
            navigation.getParent()?.setOptions({ headerShown: false })
        } else {
            // @ts-ignore
            navigation.setOptions({ tabBarStyle: { display: 'flex' } })
            navigation.getParent()?.setOptions({ headerShown: true })
        }
    }, [routeName]);

    return (
        <Stack.Navigator
            initialRouteName="ManageEvent"
            screenOptions={{
                headerStyle: { backgroundColor: "white" },
                headerTitleStyle: { fontFamily: "noto-semibold", color: "#000" },
                headerTitleAlign: "center"
            }}
        >
            <Stack.Screen name="ManageEvent" options={{ headerShown: false }} initialParams={{ eventId: eventId }}>
                {(props) => <ManageEvent route={props.route} navigation={props.navigation} />}
            </Stack.Screen>
            <Stack.Screen name="EditStaff" options={{ headerShown: false }}>
                {(props) => <WrappedEditStaff route={props.route} navigation={props.navigation} />}
            </Stack.Screen>
            {/* @ts-ignore */}
            <Stack.Screen name="EditEvent" options={{ title: "แก้ไขกิจกรรม" }}>
                {(props) => <WrappedEditEvent route={props.route} navigation={props.navigation} />}
            </Stack.Screen>
        </Stack.Navigator>
    )

}
export default ManageStackRouter