import React from "react";
import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
  StyledImage,
} from "../../../core/components/styled";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { RootEachEventDetailsTabRouterList } from "../../Event/routers/EachEventDetailsTabRouter";
import { Event } from "../../../core/hooks/Events/useGetEvents";
import { GestureResponderEvent, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Line from "./Line";
import JoinButton from "./JoinButton";
import type { EventsStackRouterType } from "../routers/EventsStackRouter";

const EventCard: React.FC<{ events: Event[] }> = ({ events }) => {
  // add navigation to eachEventPage with params : gear
  const navigation = useNavigation<NavigationProp<RootEachEventDetailsTabRouterList>>()
  const navigateToEachEvent = (eventId : number, eventName : string, eventDescription:string, eventPicture:Object|undefined, eventStart:string, eventEnd:string) => 
                              {navigation.navigate("EachEventDetails", {eventId, eventName, eventDescription, eventPicture, eventStart, eventEnd})}
  return (
    <StyledView>
      {events.map((event) => (
        <StyledTouchableOpacity 
          intent="plain" 
          key={event.id} 
          onPress={()=>navigateToEachEvent(
            event.id, 
            event.attributes.name, 
            event.attributes.description, 
            event.attributes.cover?.data,
            event.attributes.start,
            event.attributes.end
            )}>
          {/* รูปปกกิจกรรม */}
          <StyledView className="flex-row justify-center w-full my-2">
            {event.attributes.cover?.data ? (
              <StyledImage
                source={{
                  uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${event.attributes.cover?.data.attributes.url}`,
                }}
                className="w-full aspect-video rounded-lg"
              />
            ) : (
              <StyledImage
                source={require("../../../../assets/event-cover.png")}
                className="w-full aspect-video rounded-lg"
              />
            )}
          </StyledView>

          {/* ชื่อกิจกรรม */}
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="font-noto-semibold text-xl">{event.attributes.name}</StyledText>

            {/* ปุ่มเข้าร่วม */}
            <JoinButton eventName={event.attributes.name} eventId={event.id} />
          </StyledView>

          {/* คำอธิบายกิจกรรม */}
          <StyledView className="mb-2">
            {event.attributes.description && (
              <Text style={{ fontFamily: "noto" }} numberOfLines={2} className="text-gray-500">
                {event.attributes.description}
              </Text>
            )}
          </StyledView>

          {/* กล่องบอกช่วงเวลาสีเขียว ๆ */}
          <StyledView className="bg-green-100 flex-row items-center space-x-1 p-1 rounded-md">
            <MaterialCommunityIcons name="calendar" size={24} color="#5CC98C" />
            <StyledText className="font-noto-semibold">
              {event.attributes.start} ถึง {event.attributes.end}
            </StyledText>
          </StyledView>

          <StyledView className="mt-5">
            <Line />
          </StyledView>
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};

export default EventCard;
