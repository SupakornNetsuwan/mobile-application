import React, { useMemo, useState, useEffect } from "react";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import useGetEvents from "../../../core/hooks/Events/useGetEvents";
import {
  StyledText,
  StyledView,
  StyledTextInput,
  StyledTouchableOpacity,
} from "../../../core/components/styled";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import { EventsStackRouterType } from "../routers/EventsStackRouter";

const Events = () => {
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>();

  const { data, isLoading, error } = useGetEvents()!;
  const events = useMemo(() => data?.data.data, [data?.data.data])!;

  const navigateToAddEvent = () => navigation.navigate("AddEvent");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleInputChange = (text: string) => {
    setSearchQuery(text);
  };
  const filteredEvents = events?.filter((event) =>
    event.attributes.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) throw error;
  if (isLoading)
    return (
      <StyledView>
        <StyledText>Loading...</StyledText>
      </StyledView>
    );

  return (
    <StyledView style={{ flex: 1 }}>
      <ScrollView>
        <StyledTextInput
          onChangeText={handleInputChange}
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
        <EventCard events={filteredEvents} />
      </ScrollView>

      <StyledTouchableOpacity
        className="bottom-0 right-0 m-2 p-4 absolute rounded-full"
        onPress={navigateToAddEvent}
      >
        <StyledTouchableOpacity
          intent="plain"
          className="bg-white rounded-full"
          onPress={navigateToAddEvent}
        >
          <StyledText className="text-purple-primary font-noto-semibold">+</StyledText>
        </StyledTouchableOpacity>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default Events;
