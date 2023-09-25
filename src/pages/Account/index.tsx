import React from "react";
import { StyledImage, StyledView, StyledText, StyledTouchableOpacity } from "../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileImage from "./components/ProfileImage";
import ProfileStatistic from "./components/ProfileStatistic";
import AccountTabRouter from "./routers/AccountTabRouter";

const Account = () => {
  return (
    <>
      <StyledView className="m-0 bg-white">
        <StyledImage source={require("../../../assets/profile-backdrop.png")} className="w-full h-44" />
        <StyledView className="transform -translate-y-12 px-8">
          <StyledView className="flex flex-row justify-between w-full items-end">
            <ProfileImage
              imageUri="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              name="กัลยกร ยี่นาง"
              accountId="64070005"
            />
            <StyledTouchableOpacity
              onPress={(e) => console.log("z")}
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
