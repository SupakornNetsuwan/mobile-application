import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { EventsStackRouterType } from "../../Events/routers/EventsStackRouter";
import { RootEachEventDetailsTabRouterList } from "./EachEventDetailsTabRouter";
//pages
import EventDetails from "./tabs/EventDetails";
import WrappedCreatePost from "../pages/WrappedCreatePost";

import { util } from "zod";
// create an object type with mappings for route name to the params of the route.
export type RootPostStackParamsList = {
    InEventDetails: {
        eventId: number, 
        eventName:string
        eventDescription:string
        eventPicture:Object|undefined,
        eventStart:string,
        eventEnd:string
    },
    CreatePost: {
        eventId:number|undefined,
        isEdit:boolean,
        postId:string
    }

}
// route RouteProp ปกติ
// navigation ขอเป็น MaterialTobtab จะได้มี tabBarStye มาด้วย เวลาไปหน้า CreatePost เราจะSet ให้ Tab bar หายไป
// รายละเอียดเกี่ยวกับ Event คิดว่าส่งมาเป็น params ได้ ไม่จำเป็นต้องมี แต่ route กับ navigate เอาไว้ลบ Tabbar
type Props = {
    route: RouteProp<RootPostStackParamsList, 'InEventDetails'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
    eventId : number ,
    eventName:string
    eventDescription:string
    eventPicture:Object|undefined
    eventStart:string,
    eventEnd:string
  };
type CreatePostRouteProp = RouteProp<RootPostStackParamsList, 'CreatePost'>
const Stack = createStackNavigator<RootPostStackParamsList>()

const PostStackRouter = ({route, navigation, eventId, eventName, eventDescription, eventPicture, eventStart, eventEnd}:Props) =>{
    // Check ว่าตอนนี้อยุ่หน้าไหนแล้ว
    const routeName = getFocusedRouteNameFromRoute(route)
      React.useLayoutEffect(()=>{
        if(routeName === "CreatePost"){
            navigation.setOptions({tabBarStyle:{display:'none'}}) 
        }else{
            navigation.setOptions({tabBarStyle:{display:'flex'}})
        }
     })
    return(
            <Stack.Navigator
                initialRouteName="InEventDetails"
                screenOptions={{
                    headerStyle: { backgroundColor: "white" },
                    headerTitleStyle: { fontFamily: "noto", color: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                }}
            >
                <Stack.Screen 

                    name="InEventDetails"  
                    options={{ headerShown: false }} 
                    initialParams={{eventId:eventId, eventName:eventName, eventDescription:eventDescription, eventPicture:eventPicture, eventStart:eventStart, eventEnd:eventEnd}}
                >
                    {(props)=><EventDetails  {...props}/>}
                </Stack.Screen>
                <Stack.Screen name="CreatePost"   options={{title:'สร้างโพสต์'}} >
                    {(props)=><WrappedCreatePost {...props as unknown as CreatePostRouteProp} route={props.route as unknown as CreatePostRouteProp  } navigation={props.navigation}/>}
                </Stack.Screen>
            </Stack.Navigator>
    )

}
export default PostStackRouter