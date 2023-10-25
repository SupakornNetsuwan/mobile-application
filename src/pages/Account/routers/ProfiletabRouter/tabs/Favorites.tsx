import React, { useMemo } from "react";
import { StyledImage, StyledText, StyledView } from "../../../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../../../components/EmptyData";
import useGetPostsFromEventsJoined from "../../../../../core/hooks/Events/EventsJoined/useGetPostsFromEventsJoined";
import { FlatList } from "react-native";

const Favorites = () => {
  const { data, isLoading, error } = useGetPostsFromEventsJoined()!;
  const events = useMemo(() => data?.data.events, [data?.data]);

  if (isLoading) return <EmptyData label="You have no events" />;

  return (
    <StyledView className="bg-white p-2 m-4 space-y-2">
      <FlatList
        data={events}
        renderItem={({ item: camp }) => (
          <StyledView className="flex-row justify-between items-center bg-white border-2 border-slate-100 p-4" >
            <StyledView className="flex-row items-center space-x-2">
              <StyledView className="space-y-2 flex-row items-center space-x-2">
                <StyledImage
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${camp.cover.url}`,
                  }}
                  className="w-16 aspect-square rounded-full"
                />
                <StyledText className="text-lg font-noto-semibold">{camp.name}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      />
    </StyledView>
  );
};

export default Favorites;
