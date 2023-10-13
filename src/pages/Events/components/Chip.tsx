import React, { useState, useEffect } from "react";
import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
} from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ChipProperty {
  icon: any;
  title: string[];
}

const Chip: React.FC<{
  chips: ChipProperty;
  selectedChips: string[];
  onSelectedChipsChange: (newSelectedChips: string[]) => void;
}> = ({ chips, selectedChips, onSelectedChipsChange }) => {
  const handleChipPress = (label: string) => {
    if (!selectedChips.includes(label)) {
      const newSelectedChips = [...selectedChips, label];
      onSelectedChipsChange(newSelectedChips); // Update selectedChips in the parent component
    } else {
      const newSelectedChips = selectedChips.filter((chip) => chip !== label);
      onSelectedChipsChange(newSelectedChips); // Update selectedChips in the parent component
    }
  };

  return (
    <StyledView className="flex-row flex-wrap">
      {chips.title.map((chip, index) => (
        <StyledTouchableOpacity
          intent={selectedChips.includes((index+1).toString()) ? "primary" : "chip"}
          key={index}
          className="flex-row space-x-2 mr-2 mt-2 items-center"
          style={{
            borderWidth: 1,
            borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
          }}
          onPress={() => handleChipPress((index+1).toString())}
        >
          <MaterialCommunityIcons
            name={chips.icon}
            size={18}
            color={
              selectedChips.includes((index+1).toString())
                ? "#fff"
                : process.env.EXPO_PUBLIC_PRIMARY_COLOR
            }
          />
          <StyledText
            className={`text-${
              selectedChips.includes((index+1).toString()) ? "white" : "purple-primary"
            }`}
          >
            {chip}
          </StyledText>
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};

export default Chip;
