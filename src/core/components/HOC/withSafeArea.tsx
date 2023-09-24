import React from "react";
import { StyledView } from "../styled";
import { Platform, StatusBar } from "react-native";

/**
 * @description ทำ HOC เพื่อให้จอแสดงผลถูกเว้น Mobile status bar
 */

const withSafeArea = <P extends {}>(Component: React.ComponentType<P>) => {
  const HOC = (props: P) => (
    <StyledView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <Component {...props} />
    </StyledView>
  );

  return HOC;
};

export default withSafeArea;
