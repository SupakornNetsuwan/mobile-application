import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//pages
import EditStaff from "../pages/manage/EditStaff";
import ManageEvent from "./tabs/ManageEvent";
import { NavigationContainer} from '@react-navigation/native';

export type ManageStackRouterType  = {
    ManageEvent:undefined,
    EditStaff:undefined,
}

const Stack = createStackNavigator<ManageStackRouterType>()


const ManageStackRouter = () =>{
    return(
            <Stack.Navigator
                initialRouteName="ManageEvent"
                screenOptions={{
                    headerStyle: { backgroundColor: "white" },
                    headerTitleStyle: { fontFamily: "noto", color: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
                }}
            >
                <Stack.Screen name="ManageEvent" component={ManageEvent} options={{ headerShown: false }} /> 
                <Stack.Screen name="EditStaff" component={EditStaff} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
    )

}
export default ManageStackRouter