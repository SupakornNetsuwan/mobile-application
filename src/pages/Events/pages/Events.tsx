import React, { useMemo, useState, useEffect } from "react";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import useGetEvents, { Event } from "../../../core/hooks/Events/useGetEvents";
import { StyledText, StyledView, StyledTextInput, StyledTouchableOpacity } from "../../../core/components/styled";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import { EventsStackRouterType } from "../routers/EventsStackRouter";
import EventModal from "../components/EventModal";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

const Events = () => {
  const [openingEventModal, setOpeningEventModal] = useState<boolean>(false);
  const [event, setEvent] = useState<Event>();

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
    return (<LoadingActivityindicator />);

  return (
    <StyledView style={{ flex: 1 }}>
      <ScrollView className="px-4 pt-4">
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
        <StyledView className="mb-8 ">
          {filteredEvents.map((event) => (
            <EventCard event={event} setOpeningEventModal={setOpeningEventModal} setEvent={setEvent} key={event.id} />
          ))}
        </StyledView>
      </ScrollView>

      {/* ส้่วนของการเพิ่มกิจกรรม */}
      <StyledTouchableOpacity className=" border-opacity-20 flex items-center justify-center w-16 h-16 absolute bottom-8 right-5 rounded-full"
        style={{ backgroundColor: "#B146C2" }}
        onPress={navigateToAddEvent}
      >
        <StyledText className="text-purple-primary text-2xl font-noto-semibold bg-white block aspect-square text-center leading-10 rounded-full">
          +
        </StyledText>
      </StyledTouchableOpacity>

      {/* Modal for Editing action */}
      <EventModal openingEventModal={openingEventModal} setOpeningEventModal={setOpeningEventModal} event={event} />
    </StyledView>
  );
};

export default Events;
