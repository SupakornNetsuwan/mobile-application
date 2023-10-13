import React, { useState, useEffect } from "react";
import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
} from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Category } from "../../../core/hooks/Events/Category/useGetCategories";

interface ChipProperty {
  icon: any;
  items: Category[];
}

const Chip: React.FC<{
  chips: ChipProperty;
  selectedChips: number[];
  onSelectedChipsChange: (newSelectedChips: number[]) => void;
}> = ({ chips, selectedChips, onSelectedChipsChange }) => {
  const handleChipPress = (id: number) => {
    if (!selectedChips.includes(id)) {
      const newSelectedChips = [...selectedChips, id];
      onSelectedChipsChange(newSelectedChips); // Update selectedChips in the parent component
    } else {
      const newSelectedChips = selectedChips.filter((chip) => chip !== id);
      onSelectedChipsChange(newSelectedChips); // Update selectedChips in the parent component
    }
  };

  return (
    <StyledView>
      {chips.items && (
        <StyledView className="flex-row flex-wrap">
          {chips.items.map((chip) => (
            <StyledTouchableOpacity
              key={chip.id}
              intent={selectedChips.includes(chip.id) ? "primary" : "chip"}
              className="flex-row space-x-2 mr-2 mt-2 items-center"
              style={{
                borderWidth: 1,
                borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
              }}
              onPress={() => handleChipPress(chip.id)}
            >
              <MaterialCommunityIcons
                name={chips.icon}
                size={18}
                color={
                  selectedChips.includes(chip.id)
                    ? "#fff"
                    : process.env.EXPO_PUBLIC_PRIMARY_COLOR
                }
              />
              <StyledText
                className={`text-${
                  selectedChips.includes(chip.id) ? "white" : "purple-primary"
                }`}
              >
                {chip.attributes.name}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      )}
    </StyledView>
  );
};

export default Chip;
