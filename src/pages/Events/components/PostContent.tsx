import React, { useMemo } from "react";
import {
  StyledText,
  StyledView,
} from "../../../core/components/styled";
import { Post } from "../../../core/hooks/Staff/useGetStaffActivity";
import convertISOToCustomFormat from "../../../utils/convertISOToCustomFormat";
import useGetStaffActivity from "../../../core/hooks/Staff/useGetStaffActivity";

const PostContent: React.FC<{
  eventId: number;
  post: Post;
}> = ({ eventId, post }) => {
  const { data, isLoading, error } = useGetStaffActivity(
    post.owner.id,
    eventId
  )!;

  const activity = useMemo(() => data?.data.data, [data?.data.data])!;

  if (error) throw error;
  if (isLoading)
    return (
      <StyledView>
        <StyledText>Loading...</StyledText>
      </StyledView>
    );

  return (
    <StyledView className="mx-3 justify-center">
      <StyledText className="text-base font-noto-semibold">{post.title}</StyledText>
      <StyledView className="flex-row space-x-1">
        {activity[0] && activity[0].attributes.position ? (
          <StyledText className="text-gray-500">{activity[0].attributes.position}</StyledText>
        ) : (
          <StyledText className="text-gray-500">ประธานค่าย</StyledText>
        )}
        <StyledText className="text-gray-500">|</StyledText>
        <StyledText className="text-gray-500">{convertISOToCustomFormat(post.createdAt)}</StyledText>
      </StyledView>
    </StyledView>
  );
};

export default PostContent;
