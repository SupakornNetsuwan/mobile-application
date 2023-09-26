import React from "react";
import { StyledView, StyledImage } from "./styled";
import { ImageBackground } from "react-native";

const Loading = () => {
  return (
    <ImageBackground
      source={require("../../../assets/signin-bg.png")}
      className="w-full h-screen items-center justify-start pt-24"
    >
      <StyledView className="space-y-8 w-full px-12">
        <StyledImage source={require("../../../assets/signin-logo.png")} className="self-center scale-[0.35]" />
      </StyledView>
    </ImageBackground>
  );
};

export default Loading;
