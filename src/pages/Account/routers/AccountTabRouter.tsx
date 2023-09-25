import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyledView, StyledText } from "../../../core/components/styled";
import Comments from "../tabs/Comments";
import Events from "../tabs/Events";
import Favorites from "../tabs/Favorites";
import Posts from "../tabs/Posts";

export type AccountTabRouterType = {
  Posts: undefined;
  Favorites: undefined;
  comments: undefined;
  Events: undefined;
};

const AccountTab = createMaterialTopTabNavigator<AccountTabRouterType>();

const AccountTabRouter = () => {
  return (
    <AccountTab.Navigator
      initialRouteName="Posts"
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
      <AccountTab.Screen name="Posts" component={Posts} options={{ title: "โพสต์" }} />
      <AccountTab.Screen name="Events" component={Events} options={{ title: "กิจกรรม" }} />
      <AccountTab.Screen name="Favorites" component={Favorites} options={{ title: "ถูกใจ" }} />
      <AccountTab.Screen name="comments" component={Comments} options={{ title: "คอมเม้นต์" }} />
    </AccountTab.Navigator>
  );
};
export default AccountTabRouter;
