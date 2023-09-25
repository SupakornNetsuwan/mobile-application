import React from "react";
import { StyledImage, StyledText, StyledView, StyledTextInput } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Events = () => {
  return (
    <StyledView>
      <StyledTextInput
        hasIcon={true}
        icon={
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="rgb(107,114,128)"
            style={{ position: "absolute", top: "50%", left: 10, transform: [{ translateY: -12 }] }}
          />
        }
        className="text-lg"
      />
    </StyledView>
  );
};

export default Events;
