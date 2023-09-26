import React from "react";
import type { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { StyledText, StyledView } from "../../../core/components/styled";
import StyledTouchableOpacity from "../../../core/components/styled/StyledTouchableOpacity";
import { twMerge } from "tailwind-merge";
import { GestureResponderEvent } from "react-native";
import { Platform, StatusBar } from "react-native";

const TabBar = ({ state, descriptors, navigation, position }: MaterialTopTabBarProps) => {
  return (
    <StyledView className={twMerge("bg-white")}>
      {Platform.OS === "ios" && <StyledView className="w-full h-16 bg-black mb-2"/>}
      <StyledView className="flex-row w-2/3 ml-4 ">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const changeTab = (e: GestureResponderEvent) => {
            navigation.navigate(route.name);
          };

          return (
            <StyledView key={route.key} className="flex-1 bg-transparent relative">
              <StyledTouchableOpacity
                onPress={changeTab}
                intent="plain"
                className={twMerge(
                  "w-full bg-[#FAFAFA] rounded-b-lg pt-8 pb-4",
                  isFocused && "bg-gray-200",
                  index == 0 && "rounded-r-none",
                  index == 1 && "rounded-l-none"
                )}
              >
                <StyledText
                  className={twMerge(
                    "text-center text-gray-500 text-lg",
                    isFocused && "font-noto-semibold text-gray-800"
                  )}
                >
                  {options.title || route.name}
                </StyledText>
                {isFocused && <StyledView className="absolute inset-x-2 h-1 rounded-full bg-purple-primary bottom-2" />}
              </StyledTouchableOpacity>
            </StyledView>
          );
        })}
      </StyledView>
    </StyledView>
  );
};

export default TabBar;
