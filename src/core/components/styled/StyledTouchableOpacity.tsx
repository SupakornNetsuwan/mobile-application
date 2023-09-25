import React from "react";
import { styled } from "nativewind";
import { TouchableOpacity } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StyledTouchableOpacityInstance = styled(TouchableOpacity);

const touchableOpacity = cva("rounded-lg", {
  variants: {
    intent: {
      primary: ["bg-purple-primary", "border-none"],
      secondary: ["bg-white", "border-purple-primary", "border"],
      plain: undefined,
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-1.5", "px-3"],
    },
    hasIcon: {
      false: undefined,
      true: ["flex-row", "space-x-1"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

type StyledTocuhableHighlightProps = React.ComponentPropsWithRef<typeof StyledTouchableOpacityInstance> &
  VariantProps<typeof touchableOpacity> & { icon?: React.ReactElement };

/**
 * @description เป็น TouchableOpacity แบบ styled กับ nativewind ได้ (คล้าย ๆ <button> ใน HTML)
 */

const StyledTouchableOpacity = React.forwardRef<any, StyledTocuhableHighlightProps>((props, ref) => {
  const { className, intent, size, hasIcon, icon: Icon } = props;

  return (
    <StyledTouchableOpacityInstance
      activeOpacity={0.7}
      {...props}
      className={touchableOpacity({ className, intent, size, hasIcon })}
    >
      {Icon}
      {props.children}
    </StyledTouchableOpacityInstance>
  );
});

export default StyledTouchableOpacity;
