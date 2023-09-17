import React, { useRef } from "react";
import { Button, View, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { twMerge } from "tailwind-merge";
import { styled } from "nativewind";
import StyledText from "./src/core/components/Text";

const StyledButton = styled(Button);

export default function App() {
  const textRedRef = useRef<Text>();

  return (
    <SafeAreaView className={twMerge("")} style={{ padding: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <View>
        <StyledText className="text-purple-500 font-medium text-xl">asdasdx</StyledText>
        <StyledText ref={textRedRef} className="font-bold text-red-500 text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, pariatur.
        </StyledText>
        <StyledButton title="clickme" className="text-red-500 bg-red-500" onPress={(e) => {}} />
      </View>
    </SafeAreaView>
  );
}
