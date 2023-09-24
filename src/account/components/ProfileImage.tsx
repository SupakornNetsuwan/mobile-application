import React from "react";
import { StyledImage, StyledText, StyledView } from "../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileImage: React.FC<{ imageUri: string; name: string; accountId: string }> = ({
  imageUri,
  name,
  accountId,
}) => {
  return (
    <StyledView className="flex flex-col justify-center items-start">
      <StyledImage
        source={{ uri: imageUri }}
        className="h-24 aspect-square rounded-full"
        style={{ borderColor: "#B146C2", borderWidth: 2 }}
      />
      <StyledText className="font-noto-semibold text-xl mt-2">{name}</StyledText>
      <StyledView className="flex-row space-x-2 items-center">
        <MaterialCommunityIcons name="card-account-details-outline" size={20} color="rgb(107,114,128)" />
        <StyledText className="font-noto text-sm text-gray-500">Account ID : {accountId}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default ProfileImage;
