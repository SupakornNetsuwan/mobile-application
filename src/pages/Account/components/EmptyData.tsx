import React from "react";
import { StyledImage, StyledText, StyledView } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EmptyData: React.FC<{ label: string }> = ({ label }) => {
  return (
    <StyledView className="justify-center absolute top-1/2 left-1/2 -translate-x-20 -translate-y-24">
      <StyledImage source={require("../../../../assets/empty-box.png")} className="h-40 aspect-square" />
      <StyledText className="text-center text-gray-400">{label}</StyledText>
    </StyledView>
  );
};

export default EmptyData;
