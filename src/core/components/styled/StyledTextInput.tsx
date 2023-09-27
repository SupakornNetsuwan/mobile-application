import React from "react";
import { TextInput } from "react-native";
import { styled } from "nativewind";
import { cva, VariantProps } from "class-variance-authority";
import StyledView from "./StyledView";

const StyledTextInputInstance = styled(TextInput);

const textInput = cva(" bg-white text-gray-500 rounded-xl font-noto text-base px-4 py-2", {
  variants: {
    /**
     * @description ปรับเป็น true ถ้าหากมีการส่ง Icon component มาด้วย
     */
    hasIcon: {
      false: undefined,
      true: ["pl-12", "pr-4"],
    },
  },
  defaultVariants: {
    hasIcon: false,
  },
});

type StyledTextInputProps = React.ComponentPropsWithRef<typeof StyledTextInputInstance> &
  VariantProps<typeof textInput> & { icon?: React.ReactElement };

/**
 * @description เป็น Input แบบ styled กับ nativewind ได้ (คล้าย ๆ <input> ใน HTML)
 */

const StyledTextInput = React.forwardRef<typeof TextInput, StyledTextInputProps>((props, ref) => {
  const { hasIcon, className, icon: Icon } = props;
  
  if (hasIcon) {
    return (
      <StyledView className="relative">
        <StyledTextInputInstance {...props} ref={ref} className={textInput({ className, hasIcon })} />
        {Icon}
      </StyledView>
    );
  }

  return <StyledTextInputInstance {...props} ref={ref} className={textInput({ className, hasIcon })} />;
});

export default StyledTextInput;
