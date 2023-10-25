import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyledView, StyledText } from "../../../../core/components/styled";

import Events from "./tabs/Events";
import Favorites from "./tabs/Favorites";
import Posts from "./tabs/Posts";

export type ProfileTabRouterType = {
  Posts: undefined;
  Favorites: undefined;

  Events: undefined;
};

const ProfileTab = createMaterialTopTabNavigator<ProfileTabRouterType>();

const ProfileTabRouter = () => {
  return (
    <ProfileTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#FAFAFA" },
        tabBarItemStyle: { width: 120 },
        tabBarLabelStyle: { fontFamily: "noto" },
        tabBarIndicatorStyle: { backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
        tabBarBounces: true,
        tabBarPressColor: "#f7e3fa",
        tabBarScrollEnabled: true,
      }}
    >
      <ProfileTab.Screen name="Posts" component={Posts} options={{ title: "โพสต์" }} />
      <ProfileTab.Screen name="Events" component={Events} options={{ title: "กิจกรรม" }} />
      <ProfileTab.Screen name="Favorites" component={Favorites} options={{ title: "กำลังติดตาม" }} />
    </ProfileTab.Navigator>
  );
};
export default ProfileTabRouter;
