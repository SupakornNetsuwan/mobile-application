import React, { LegacyRef } from "react";
import { Text } from "react-native";
import { styled } from "nativewind";

const StyledTextInstance = styled(Text);

/**
 * @description เป็น Text แบบ styled กับ nativewind ได้ (คล้าย ๆ <p> ใน HTML)
 */

const StyledText = React.forwardRef<any, React.ComponentPropsWithRef<typeof StyledTextInstance>>((props, ref) => {
  return <StyledTextInstance {...props} ref={ref} />;
});

export default StyledText;
