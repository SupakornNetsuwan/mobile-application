import React, { useMemo, useState } from "react";
import {
  StyledText,
  StyledView,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledImage,
} from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetPostsFromEventsJoined from "../../../core/hooks/Events/EventsJoined/useGetPostsFromEventsJoined";
import PostContent from "../components/PostContent";
import { ScrollView } from "react-native";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

const Following = () => {
  const { data, isLoading, error } = useGetPostsFromEventsJoined()!;
  const activities_events = useMemo(
    () => data?.data,
    [data?.data]
  )!;

  if (error) throw error;
  if (isLoading)
    return <LoadingActivityindicator />;

  const activityPostsWithEvents = activities_events.activities.flatMap((activity) =>
    activity.event.posts.map((post) => ({
      post,
      event: activity.event,
    }))
  );

  const eventPostsWithEvents = activities_events.events.flatMap((event) =>
    event.posts.map((post) => ({
      post,
      event,
    }))
  );
  const allPostsWithEvents = [...activityPostsWithEvents, ...eventPostsWithEvents];

  allPostsWithEvents.sort((pairA, pairB) => {
    const createdAtA = new Date(pairA.post.createdAt).getTime();
    const createdAtB = new Date(pairB.post.createdAt).getTime();
    return createdAtB - createdAtA;
  });

  return (
    <ScrollView>
      <StyledTextInput
        hasIcon={true}
        icon={
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="rgb(107,114,128)"
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: [{ translateY: -12 }],
            }}
          />
        }
        placeholder="ค้นหากิจกรรม"
        className="text-lg bg-gray-100"
      />

      {allPostsWithEvents.map((activity) => (
        <StyledTouchableOpacity key={activity.post.id} intent="plain" className="bg-gray-100 mt-3 flex-row">
          <StyledView className="flex-row items-center justify-center w-20">
            {activity.event.cover ? (
              <StyledImage
                style={{ width: "75%" }}
                className="aspect-square rounded-full my-1"
                source={{
                  uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${activity.event.cover.url}`,
                }}
              />
            ) : (
              <StyledImage
                style={{ width: "75%" }}
                className="aspect-square rounded-full my-1"
                source={require("../../../../assets/event-cover.png")}
              />
            )}
          </StyledView>
          <PostContent eventId={activity.event.id} post={activity.post} />
        </StyledTouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Following;
