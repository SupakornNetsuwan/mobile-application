import React from "react";
import { styled } from "nativewind";
import { View } from "react-native";

const StyledViewInstance = styled(View);

/**
 * @description เป็น View แบบ styled กับ nativewind ได้ (คล้าย ๆ <div> ใน HTML)
 */

const StyledView = React.forwardRef<any, React.ComponentPropsWithRef<typeof StyledViewInstance>>((props, ref) => {
  return <StyledViewInstance {...props} />;
});

export default StyledView;
