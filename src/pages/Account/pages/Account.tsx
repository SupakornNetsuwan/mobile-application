import React from "react";
import { StyledImage, StyledView, StyledText, StyledTouchableOpacity } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileImage from "../components/ProfileImage";
import ProfileStatistic from "../components/ProfileStatistic";
import AccountTabRouter from "../routers/ProfiletabRouter";
import useAuthen from "../../../core/hooks/useAuthen";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { AccountStackRouterType } from "../routers/AccountStackRouter";

const Account = () => {
  const { signOut } = useAuthen();
  const navigation = useNavigation<NavigationProp<AccountStackRouterType>>();

  const navigateToEditProfile = () => navigation.navigate("EditProfile");

  return (
    <>
      <StyledView className="m-0 bg-white">
        <StyledImage source={require("../../../../assets/profile-backdrop.png")} className="w-full h-44" />
        <StyledTouchableOpacity
          onPress={signOut}
          size="small"
          className="bg-white/30 border border-white/50 aspect-square px-2 py-2 backdrop-blur-sm absolute flex-row items-center top-12 right-6"
        >
          <MaterialCommunityIcons name="logout" size={24} color="#d73434" />
        </StyledTouchableOpacity>
        <StyledView className="transform -translate-y-12 px-8">
          <StyledView className="flex flex-row justify-between w-full items-end">
            <ProfileImage
              imageUri="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              name="กัลยกร ยี่นาง"
              accountId="64070005"
            />
            <StyledTouchableOpacity
              onPress={navigateToEditProfile}
              icon={
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={24}
                  color={process.env.EXPO_PUBLIC_PRIMARY_COLOR}
                />
              }
              hasIcon={true}
              intent="secondary"
              size="medium"
              className="self-center mt-8"
            >
              <StyledText className="text-lg font-medium text-purple-primary">แก้ไข</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          <StyledView className="w-full flex-row pt-4 justify-between">
            <ProfileStatistic amount={0} label="Posts" />
            <ProfileStatistic amount={0} label="Comments" />
            <ProfileStatistic amount={0} label="Favorites" />
          </StyledView>
        </StyledView>
      </StyledView>
      <AccountTabRouter />
    </>
  );
};

export default Account;
