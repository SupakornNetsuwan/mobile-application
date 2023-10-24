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
import EmptyData from "../../Account/components/EmptyData";

const Following = () => {
  const { data, isLoading, error } = useGetPostsFromEventsJoined()!;
  const activities_events = useMemo(
    () => data?.data,
    [data?.data]
  )!;
  const [searchQuery, setSearchQuery] = useState("");

  if (error) throw error;
  if (isLoading) { return <LoadingActivityindicator />; }

  const activityPostsWithEvents = activities_events.activities.flatMap((activity) => {
    if (activity?.event && activity.event.posts?.length) {
      return (activity.event.posts || []).map((post) => ({
        post,
        event: activity.event,
      }));
    }
    return [];
  });

  const eventPostsWithEvents = activities_events.events.flatMap((event) => {
    if (event?.posts && event.posts.length) {
      return event.posts.map((post) => ({
        post,
        event,
      }));
    }
    return [];
  });

  let allPostsWithEvents = [...activityPostsWithEvents, ...eventPostsWithEvents];

  if (allPostsWithEvents.length === 0) {
    return <EmptyData label="eiei" />;
  }

  allPostsWithEvents = allPostsWithEvents.filter((activity) => {
    return activity.post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  allPostsWithEvents.sort((pairA, pairB) => {
    const createdAtA = new Date(pairA.post.createdAt).getTime();
    const createdAtB = new Date(pairB.post.createdAt).getTime();
    return createdAtB - createdAtA;
  });

  return (
    <StyledView style={{ flex: 1 }}>
      <ScrollView className="px-4 pt-4">
        <StyledTextInput
          onChangeText={(text) => setSearchQuery(text)}
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

        <StyledView>
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
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default Following;
