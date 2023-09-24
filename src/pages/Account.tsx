import React from "react";
import { StyledImage, StyledView, StyledText, TouchableOpacity } from "../core/components/styled";
import ProfileImage from "../account/components/ProfileImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Account = () => {
  return (
    <>
      <StyledView className="m-0 bg-white">
        <StyledImage source={require("../../assets/profile-backdrop.png")} className="w-full h-44" />
        <StyledView className="transform -translate-y-12 px-8">
          <StyledView className="flex flex-row justify-between w-full items-end">
            <ProfileImage
              imageUri="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              name="กัลยกร ยี่นาง"
              accountId="64070005"
            />
            <TouchableOpacity
              onPress={(e) => console.log("z")}
              icon={<MaterialCommunityIcons name="account-edit-outline" size={24} color="#B146C2" />}
              hasIcon={true}
              intent="secondary"
              size="medium"
              className="self-center mt-8"
            >
              <StyledText className="text-lg font-medium text-purple-primary">แก้ไข</StyledText>
            </TouchableOpacity>
          </StyledView>
          <StyledView className="w-full flex-row pt-4 justify-between">
            <StyledView>
              <StyledText className="font-noto-bold text-lg text-center">0</StyledText>
              <StyledText className="text-center -mt-2 text-gray-500">Posts</StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="font-noto-bold text-lg text-center">0</StyledText>
              <StyledText className="text-center -mt-2 text-gray-500">Posts</StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="font-noto-bold text-lg text-center">0</StyledText>
              <StyledText className="text-center -mt-2 text-gray-500">Posts</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </>
  );
};

export default Account;
