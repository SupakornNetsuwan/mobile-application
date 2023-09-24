import React from "react";
import { Button } from "react-native";
import { StyledText, StyledView } from "../core/components/styled"
import useSignIn from "../hooks/useSignIn";
import withSafeArea from "../core/components/HOC/withSafeArea";

const Landing = () => {
  const { mutate } = useSignIn({
    onSuccess(data, variables, context) {
      console.log(data.data);
    },
    onError(error, variables, context) {
      console.log(error.response?.data);
    },
  });

  const signIn = () => {
    mutate({ identifier: "64070108", password: "Earththai98" });
  };

  return (
    <StyledView className="">
      <StyledText className="text-purple-500 font-bold text-xl">Title</StyledText>
      <StyledText className="text-sm my-4 ">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, quos.
      </StyledText>
      <Button
        title="Click me"
        onPress={(e) => {
          signIn();
        }}
      />
    </StyledView>
  );
};

export default withSafeArea(Landing);
