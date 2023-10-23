import React from "react";
import { StyledView, StyledImage } from "./styled";
import { ImageBackground } from "react-native";

const Loading = () => {
  return (
    <ImageBackground
      source={require("../../../assets/signin-bg.png")}
      className="w-full h-screen items-center justify-center"
      style={{flex:1}}
    >
      <StyledImage source={require("../../../assets/signin-logo.png")} className="self-center scale-[0.35]" />
    </ImageBackground>
  );
};

export default Loading;
