import React, { useMemo } from "react";
import useGetPosts from "../../../../../../core/hooks/useGetPosts";
import { StyledImage, StyledText, StyledView } from "../../../../../../core/components/styled";
import { FlatList } from "react-native";
import useAuthen from "../../../../../../core/hooks/useAuthen";
import LoadingActivityindicator from "../../../../../../core/components/LoadingActivityindicator";

const EachEvent: React.FC<{ postId: number }> = ({ postId }) => {
  const auth = useAuthen();
  if (auth.status === "unauthenticated") {
    throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
  }
  if (auth.status === "loading") {
    return <LoadingActivityindicator />;
  }

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
        renderItem={({ item: post }) => {
          if (post.attributes.owner.data.id === auth.session.user.id) {
            return (
              <StyledView className="flex-row justify-between items-center bg-white border-2 border-slate-100 p-4">
                <StyledView className="flex-row items-center space-x-2">
                  <StyledView className="space-y-2">
                    <StyledText className="text-lg font-noto-semibold">{post.attributes.title}</StyledText>
                    <StyledText className="text-sm">{post.attributes.content}</StyledText>
                  </StyledView>
                </StyledView>
              </StyledView>
            );
          }
          // Return null if the condition isn't met
          return null;
        }}
      />
    </StyledView>
  );
};

export default EachEvent;
