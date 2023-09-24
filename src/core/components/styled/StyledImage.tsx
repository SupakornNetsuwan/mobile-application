import React from "react";
import { styled } from "nativewind";
import { Image } from "react-native";

const StyledImageInstance = styled(Image);

/**
 * @description เป็น Image แบบ styled กับ nativewind ได้ (คล้าย ๆ <image> ใน HTML)
 */


const StyledImage = React.forwardRef<any, React.ComponentPropsWithRef<typeof StyledImageInstance>>((props, ref) => {
  return <StyledImageInstance {...props} ref={ref} />;
});

export default StyledImage;
