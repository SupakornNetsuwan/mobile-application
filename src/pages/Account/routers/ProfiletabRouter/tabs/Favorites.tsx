import React, { useMemo } from "react";
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../../../components/EmptyData";
import useGetPostsFromEventsJoined from "../../../../../core/hooks/Events/EventsJoined/useGetPostsFromEventsJoined";
import { FlatList } from "react-native";
import useGetEventsJoined from "../../../../../core/hooks/Events/EventsJoined/useGetEventsJoined";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { EventsStackRouterType } from "../../../../Events/routers/EventsStackRouter";

const Favorites = () => {
  const { data, isLoading, error } = useGetEventsJoined()!;
  const events = useMemo(() => data?.data.activities, [data?.data]);
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>()
  
  if (isLoading) return <EmptyData label="You have no events" />;

  return (
    <StyledView className="bg-white p-2 m-4 space-y-2 rounded">
      <FlatList
        data={events}
        renderItem={({ item: camp }) => (
          <StyledTouchableOpacity onPress={() => navigation.navigate("EachEventDetails", {eventId:camp.event.id, eventName:camp.event.name})} className="flex-row justify-between items-center bg-white border-2 border-slate-100 p-2 m-2 rounded" >
            <StyledView className="flex-row items-center space-x-2">
              <StyledView className="space-y-2 flex-row items-center space-x-2">
                {camp.event?.cover.url ?
                  (<StyledImage
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${camp.event.cover?.url}`,
                    }}
                    className="w-16 aspect-square rounded-full"
                  />) :
                  (<StyledImage className="w-16 aspect-square rounded-full"
                    source={require("../../../../../../assets/event-cover.png")}
                  />)
                }
                <StyledView>
                  <StyledText className="text-lg font-noto-semibold">{camp.event?.name}</StyledText>
                  <StyledText>{camp.position}</StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );
};

export default Favorites;
