import React, { useEffect } from "react";
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
import useGetEvent from "../../../core/hooks/useGetEvent";
import { useState } from "react";
import useAuthen from "../../../core/hooks/useAuthen";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const EventCard: React.FC<{ events: Event[] }> = ({ events }) => {
// emulates a fetch (useQuery expects a Promise)
  const [userId, setUserId] = useState<number | null>(null);
  const [eventList, setEventList] = useState<Event[]>(events); 
  const [reFetch, setRefetch] = useState<boolean | null>(null);
  const auth = useAuthen()

  const queryClient = useQueryClient()
  useEffect(()=>{
    if(auth.status === "authenticated"){
      setUserId(auth.session.user.id)
    }
  },[reFetch, auth])
  // check user นั้นเป็น สต๊าฟ ของ event ไหม
  const checkAccessToEvent = async (event:Event) =>{
    queryClient.invalidateQueries(["getEvents"])
    const staffs = event.attributes.staffs
    let userIsStaff = false;
    if(staffs.data.length > 0){
        staffs.data.forEach((staff)=>{
          if(staff.attributes.staff.data.id == userId){
            userIsStaff = true
            navigation.navigate("EachEventDetails", {eventId:event.id, 
                                                      eventName:event.attributes.name, 
                                                      eventDescription: event.attributes.description, 
                                                      eventPicture: event.attributes.cover?.data, 
                                                      eventStart: event.attributes.start, 
                                                      eventEnd: event.attributes.end, 
                                                      eventOwnerId:event.attributes.owner.data.id.toString() })
          }
        })
        if (!userIsStaff) {
          Toast.show({ text1: `คุณไม่ได้เข้าร่วมกิจกรรมนี้⚠️` });
        }
    }else{
    Toast.show({ text1: `คุณไม่ได้เข้าร่วมกิจกรรมนี้⚠️` });
    }
  }

  // add navigation to eachEventPage with params : gear
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>()
  return (
    <StyledView>
      {events.map((event) => (
        <StyledTouchableOpacity 
          intent="plain" 
          key={event.id} 
          onPress={()=>checkAccessToEvent(event)}
          >
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
