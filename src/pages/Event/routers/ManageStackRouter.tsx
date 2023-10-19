import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack"
//pages
import EditStaff from "../pages/manage/EditStaff";
import ManageEvent from "./tabs/ManageEvent";
import { NavigationContainer} from '@react-navigation/native';
import {  RouteProp } from '@react-navigation/native';
type PictureType ={
    attributes:{
      url:string
    }
  }
type staffType = {
    attributes:{
        url: string
    }| undefined,
}
export type ManageStackRouterType  = {
    ManageEvent: {
        eventId:number, 
        eventName:string,
        eventDescription:string,
        eventPicture:Object|undefined,
        eventStart:string,
        eventEnd:string,
        eventOwnerId:string,
    }
    EditStaff:{
        eventName: string |undefined,
        eventDescription: string |undefined,
        eventPicture: PictureType | undefined,
        staffDuty: string | undefined,
        staffPosition: string | undefined,
        staffPicture: staffType |undefined
        staffUsername: string | undefined,
        staffStudentId:string | undefined
    },
}
const Stack = createStackNavigator<ManageStackRouterType>()

type ManageStackRouterProp = {
    route: RouteProp<ManageStackRouterType, 'ManageEvent'>
    navigation : StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
    eventId : number ,
    eventName:string
    eventDescription:string
    eventPicture:Object|undefined
    eventStart:string,
    eventEnd:string
}

const ManageStackRouter = ({route, navigation, eventId, eventName, eventDescription, eventEnd,eventPicture,eventStart}: ManageStackRouterProp)  =>{
    return(
            <Stack.Navigator
            
                initialRouteName="ManageEvent"
                screenOptions={{
                    headerStyle: { backgroundColor: "white" },
                    headerTitleStyle: { fontFamily: "noto", color: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                }}
            >
                <Stack.Screen name="ManageEvent"  options={{ headerShown: false }} initialParams={{eventId:eventId, eventName:eventName, eventDescription:eventDescription, eventPicture:eventPicture, eventStart:eventStart, eventEnd:eventEnd}}>
                    {(props)=><ManageEvent  route={props.route} navigation={props.navigation}/>}
                </Stack.Screen> 
                <Stack.Screen name="EditStaff" component={EditStaff} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
    )

}
export default ManageStackRouter