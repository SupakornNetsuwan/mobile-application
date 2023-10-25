import React, { useMemo } from "react";
import { StyledImage, StyledText, StyledTouchableOpacity, StyledView } from "../../../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EmptyData from "../../../components/EmptyData";
import useGetEvents from "../../../../../core/hooks/Events/useGetEvents";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { EventsStackRouterType } from "../../../../Events/routers/EventsStackRouter";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootPostStackParamsList } from "../../../../Event/routers/PostStackRouter";
import { FlatList } from "react-native";
import useAuthen from "../../../../../core/hooks/useAuthen";
import LoadingActivityindicator from "../../../../../core/components/LoadingActivityindicator";

const Events = () => {
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>()

  const auth = useAuthen();
  if (auth.status === "unauthenticated") {
    throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
  }
  if (auth.status === "loading") {
    return <LoadingActivityindicator />;
  }

  const { data, isLoading } = useGetEvents()!;
  const events = useMemo(() => data?.data.data, [data?.data]);

  if (isLoading) {
    return <EmptyData label="You have no events" />;
  }

  return (
    <StyledView className="bg-white p-2 m-4 space-y-2 rounded">
      <FlatList
        ItemSeparatorComponent={() => <StyledView className="w-full bg-transparent" />}
        data={events}
        renderItem={({ item: event }) => {
          // Check if the event's owner id matches the current user's id
          if (event.attributes.owner.data.id === auth.session.user.id) {
            return (
              <StyledTouchableOpacity onPress={() => navigation.navigate("EachEventDetails", { eventId: event.id, eventName: event.attributes.name })} className="flex-row justify-between items-center bg-amber-200 border-2 border-amber-300 p-2 m-2 rounded">
                <StyledView className="flex-row items-center space-x-2">
                  {event.attributes.cover?.data ?
                    (<StyledImage
                      source={{
                        uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${event.attributes.cover?.data.attributes.url}`,
                      }}
                      className="w-16 aspect-square rounded-full"
                    />) :
                    (<StyledImage className="w-16 aspect-square rounded-full"
                      source={require("../../../../../../assets/event-cover.png")}
                    />)
                  }
                  <StyledText className="text-lg font-noto-semibold">{event.attributes.name}</StyledText>
                </StyledView>
                <MaterialCommunityIcons name="trophy-award" size={24} color="#bca317" />
              </StyledTouchableOpacity>
            );
          } else {
            return null; // Return null for events the user shouldn't see
          }
        }}
      />
    </StyledView>
  );
};

export default Events;
