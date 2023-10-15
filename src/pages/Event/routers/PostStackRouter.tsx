import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RouteProp } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
//pages
import EventDetails from "./tabs/EventDetails";
import CreatePost from "../pages/CreatePost";
// create an object type with mappings for route name to the params of the route.
export type RootPostStackParamsList = {
    EventDetails: undefined,
    CreatePost: undefined
}

// route RouteProp ปกติ
// navigation ขอเป็น MaterialTobtab จะได้มี tabBarStye มาด้วย เวลาไปหน้า CreatePost เราจะSet ให้ Tab bar หายไป
type Props = {
    route: RouteProp<RootPostStackParamsList, 'EventDetails'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'EventDetails'>; // Adjust this line
  };
const Stack = createStackNavigator<RootPostStackParamsList>()

const PostStackRouter = ({route, navigation}:Props) =>{
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
                initialRouteName="EventDetails"
                screenOptions={{
                    headerStyle: { backgroundColor: "white" },
                    headerTitleStyle: { fontFamily: "noto", color: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                }}
            >
                <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false }} /> 
                <Stack.Screen name="CreatePost" component={CreatePost} options={{title:'สร้างโพสต์'}}></Stack.Screen>
            </Stack.Navigator>
    )

}
export default PostStackRouter