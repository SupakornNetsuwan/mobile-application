import React from "react";
import { StyledText, StyledView } from "../../../core/components/styled";

const ProfileStatistic: React.FC<{ label: string; amount: number }> = ({ amount, label }) => {
  return (
    <StyledView>
      <StyledText className="font-noto-bold text-lg text-center">{amount}</StyledText>
      <StyledText className="text-center -mt-2 text-gray-500">{label}</StyledText>
    </StyledView>
  );
};

export default ProfileStatistic;
