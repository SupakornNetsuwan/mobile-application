import React from "react";
import { Button, Platform, StatusBar } from "react-native";
import StyledText from "./src/core/components/StyledText";
import StyledView from "./src/core/components/StyledView";

const App = () => {
  return (
    <StyledView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <StyledView className="p-12 shadow bg-gray-100 m-12">
        <StyledText className="text-purple-500 font-bold text-xl">Title</StyledText>
        <StyledText className="text-sm my-4 ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis, pariatur.
        </StyledText>
        <Button title="Click me" onPress={(e) => {}} />
      </StyledView>
    </StyledView>
  );
};

export default App;