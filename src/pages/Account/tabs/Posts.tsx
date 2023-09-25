import React from "react";
import { StyledImage, StyledText, StyledView } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../components/EmptyData";

const Posts = () => {
  const isHavePosts = true;
  if (isHavePosts) return <EmptyData label="You have no posts" />;

  return (
    <StyledView>
      <StyledText>Posts</StyledText>
    </StyledView>
  );
};

export default Posts;
