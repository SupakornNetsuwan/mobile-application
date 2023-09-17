import React from "react";
import { Text } from "react-native";
import { styled } from "nativewind";

const TempStyledText = styled(Text);

const StyledText = React.forwardRef<Text, React.ComponentPropsWithRef<typeof Text>>((props, ref) => {
  return <Text {...props} ref={ref} />;
});

export default StyledText;
