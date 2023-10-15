import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../pages/Account";
import EditProfile from "../pages/EditProfile";
import EditProfileFormProvider from "../providers/EditProfileFormProvider";

export type AccountStackRouterType = {
  Account: undefined;
  EditProfile: undefined;
};

const Stack = createStackNavigator<AccountStackRouterType>();

const AccountStackRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontFamily: "noto", color: process.env.EXPO_PUBLIC_PRIMARY_COLOR },
      }}
    >
     <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} /> 
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "แก้ไขโปรไฟล์" }} />
    </Stack.Navigator>
  );
};

export default AccountStackRouter;
