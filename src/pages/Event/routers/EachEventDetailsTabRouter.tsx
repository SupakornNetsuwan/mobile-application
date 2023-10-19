
import { createMaterialTopTabNavigator, } from "@react-navigation/material-top-tabs";
import {  RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
//router
import ManageStackRouter from "./ManageStackRouter";
import PostStackRouter from "./PostStackRouter";
import { EventsStackRouterType } from "../../Events/routers/EventsStackRouter";
import useAuthen from "../../../core/hooks/useAuthen";
import { useMemo } from "react";
import { ManageStackRouterType } from "./ManageStackRouter";
export type RootEachEventDetailsTabRouterList = {
    // EachEventDetails รับ สองอย่างคือ eventId , กับเช็คว่าคนที่เข้าเป็น adminไหม
    InEventDetails : {
        eventId:number, 
        eventName:string,
        eventDescription:string,
        eventPicture:Object|undefined,
        eventStart:string,
        eventEnd:string,
        eventOwnerId:string,
    },
    ManageStackRouter : undefined,
}


type Props = {
    route : RouteProp<EventsStackRouterType ,'EachEventDetails'>;
    navigation: StackNavigationProp<EventsStackRouterType, 'EachEventDetails'>
}
// type Props  = MaterialTopTabNavigationProp<RootEventDetailsTabRouterList, "PostStackRouter">
const EventDetailsTab = createMaterialTopTabNavigator<RootEachEventDetailsTabRouterList>()
type ManageStackRouterRouteType = RouteProp<ManageStackRouterType, 'ManageEvent'>;
type ManageStackRouterNavigationType = StackNavigationProp<ManageStackRouterType,'ManageEvent'>
const EachEventDetailsTabRouter = ({route, navigation}:Props) =>{
    let ownerEvent = false
    const eventId = route.params.eventId
    const eventName = route.params.eventName
    const eventDescription = route.params.eventDescription
    const eventPicture = route.params.eventPicture
    const eventStart = route.params.eventStart
    const eventEnd = route.params.eventEnd
    const eventOwnerId = route.params.eventOwnerId
    const auth = useAuthen()
    if(auth.status === "authenticated"){
        if(auth.session.user.id.toString() == eventOwnerId){
            ownerEvent = true
        }
    }
    useEffect(()=>{
        navigation.setOptions({headerTitle:eventName})
    }, [route])
    return (
        <>
            <EventDetailsTab.Navigator
                initialRouteName="InEventDetails"
                screenOptions={{
                    tabBarStyle: { backgroundColor: "#FAFAFA"},
                    tabBarItemStyle:{
                        width: ownerEvent? 200 : "100%"},
                    tabBarLabelStyle: { fontFamily: "noto", textAlign:'center', flex:1 },
                    tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                    tabBarBounces: true,
                    tabBarPressColor: "#f7e3fa",
                    tabBarScrollEnabled: true,
                    tabBarActiveTintColor:"grey",
                    tabBarInactiveTintColor:"black",
                    
                  }}
            >
                <EventDetailsTab.Screen  
                    name="InEventDetails" 
                    options={{ title: "กิจกรรม" , tabBarLabelStyle:{fontSize:16}}}
                >
                        {/* คิดว่าส่งเป็น params ได้ ไม่จำเป็นค้องใช้ props แต่ลองไว้เล่นเดียวแก้*/}
                        {(props) => <PostStackRouter {...props} 
                                        route={props.route}
                                        navigation={props.navigation} 
                                        eventId={eventId} 
                                        eventName={eventName} eventPicture={eventPicture} 
                                        eventDescription={eventDescription} 
                                        eventStart={eventStart}
                                        eventEnd={eventEnd}/>}
                </EventDetailsTab.Screen>
                {ownerEvent && (
                    <EventDetailsTab.Screen   name="ManageStackRouter" options={{ title: "จัดการ", tabBarLabelStyle:{fontSize:16 }}} >
                        {(props)=><ManageStackRouter {...props as unknown as ManageStackRouterRouteType}  
                        route={props.route as unknown as ManageStackRouterRouteType} 
                        navigation={props.route as unknown as  ManageStackRouterNavigationType} 
                        eventId={eventId} 
                        eventName={eventName} eventPicture={eventPicture} 
                        eventDescription={eventDescription} 
                        eventStart={eventStart}
                        eventEnd={eventEnd}
                        />}
                    </EventDetailsTab.Screen>
                )}
            </EventDetailsTab.Navigator>
        </>
    )
}

export default EachEventDetailsTabRouter