import React, { useMemo } from "react";
import useGetPosts from "../../../../../../core/hooks/useGetPosts";
import { StyledImage, StyledText, StyledView } from "../../../../../../core/components/styled";
import { FlatList } from "react-native";

const EachEvent: React.FC<{ postId: number }> = ({ postId }) => {
  const { data, isLoading, isSuccess } = useGetPosts(String(postId))!;
  const posts = useMemo(() => data?.data.data, [data?.data]);

  if (isLoading)
    return (
      <StyledView>
        <StyledText>Loading...</StyledText>
      </StyledView>
    );

  return (
    <StyledView className="m-4 space-y-2">
      <FlatList
        data={posts}
        renderItem={({ item: post }) => (
          <StyledView className="flex-row justify-between items-center bg-white border-2 border-slate-100 p-4">
            <StyledView className="flex-row items-center space-x-2">
              <StyledView className="space-y-2">
                <StyledText className="text-lg font-noto-semibold">{post.attributes.title}</StyledText>
                <StyledText className="text-sm">{post.attributes.content}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      />
    </StyledView>
  );
};

export default EachEvent;
