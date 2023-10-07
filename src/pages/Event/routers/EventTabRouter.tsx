import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationProp, RouteProp } from '@react-navigation/native';
//router
import ManageStackRouter from "./ManageStackRouter";
import PostStackRouter from "./PostStackRouter";


export type RootEventDetailsTabRouterList = {
    EventDetails : undefined,
    ManageStackRouter : undefined
    
}
// type Props  = MaterialTopTabNavigationProp<RootEventDetailsTabRouterList, "PostStackRouter">
const EventDetailsTab = createMaterialTopTabNavigator<RootEventDetailsTabRouterList>()
const EventTabRouter = ({user}:{user:string}) =>{
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
                <EventDetailsTab.Screen  name="EventDetails" options={{ title: "กิจกรรม" , tabBarLabelStyle:{fontSize:16}}}>
                        {(props) => <PostStackRouter {...props} route={props.route} navigation={props.navigation} />}
                </EventDetailsTab.Screen>
                {user === "admin" && (
                    <EventDetailsTab.Screen component={ManageStackRouter} name="ManageStackRouter" options={{ title: "จัดการ", tabBarLabelStyle:{fontSize:16 }}} />
                )}
            </EventDetailsTab.Navigator>
        </>
    )
}

export default EventTabRouter