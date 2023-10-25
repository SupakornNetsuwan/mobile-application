import React, { useEffect } from "react";
import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
  StyledImage,
} from "../../../core/components/styled";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { Event } from "../../../core/hooks/Events/useGetEvents";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import JoinButton from "./JoinButton";
import type { EventsStackRouterType } from "../routers/EventsStackRouter";
import { useState, useMemo, useRef, useCallback } from "react";
import useAuthen from "../../../core/hooks/useAuthen";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteStaffActivity from "../../../core/hooks/Staff/useDeleteStaffActivity";
import useAddStaffActivity from "../../../core/hooks/Staff/useAddStaffActivity";
import useGetStaffActivity from "../../../core/hooks/Staff/useGetStaffActivity";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

const EventCard: React.FC<{ event: Event, setOpeningEventModal?: (newType: boolean) => void, setEvent?: (newType: Event) => void }> = ({ event, setOpeningEventModal, setEvent }) => {
  // emulates a fetch (useQuery expects a Promise)
  // const [userId, setUserId] = useState<number | null>(null);
  // const [reFetch, setRefetch] = useState<boolean | null>(null);

  const auth = useAuthen();

  if (auth.status == "loading")
    return (
      <LoadingActivityindicator />
    );

  if (auth.status == "unauthenticated")
    throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

  const { data: activityData, isLoading: activityLoading, error: activityError } = useGetStaffActivity(
    auth.session.user.id,
    event.id
  )!;

  const activity = useMemo(() => activityData?.data.data, [activityData?.data.data])!;

  const isEventOwner = event.attributes.owner.data.id == auth.session.user.id
  const joined = activity?.length > 0 || isEventOwner
  const intent = joined ? "primary" : "plain";
  const textClass = joined ? "text-white" : "text-purple-primary";
  const buttonText = joined ? "กำลังเข้าร่วม" : "เข้าร่วม";

  const queryClient = useQueryClient();
  const addStaff = useAddStaffActivity();
  const deleteStaff = useDeleteStaffActivity();

  // useEffect(()=>{
  //   if(auth.status === "authenticated"){
  //     setUserId(auth.session.user.id)
  //   }
  // },[reFetch, auth])

  const handleEvent = () => {
    if (joined || isEventOwner) {
      navigation.navigate("EachEventDetails", {
        eventId: event.id,
        eventName: event.attributes.name,
      })
    }
    else if (!joined) {
      Toast.show({ text1: `คุณไม่ได้เข้าร่วมกิจกรรมนี้ ⚠️`, text2: "กรุณาเข้าร่วมกิจกรรมก่อนเข้าสู่กิจกรรม" });
    }
  }

  const handleJoin = () => {
    if (isEventOwner) {
      Toast.show({ text1: `ไม่สามารถออกจากกิจกรรม ${event.attributes.name} ได้`, text2: "เนื่องจากคุณเป็นเจ้าของกิจกรรม" });
    }
    else if (joined) {
      deleteStaff?.mutate(
        { staffId: activity[0]?.id },
        {
          onSuccess() {
            queryClient.invalidateQueries(["getEvents"])
            Toast.show({ text1: `ออกจากกิจกรรม ${event.attributes.name} แล้ว 😿` });
            queryClient.invalidateQueries(["getStaffActivities", auth.session.user.id, event.id]);
            queryClient.invalidateQueries(["getPostsFromEventsJoined"])
          },
        }
      );
    } else {
      addStaff?.mutate(
        { eventId: event.id },
        {
          onSuccess() {
            queryClient.invalidateQueries(["getEvents"])
            Toast.show({ text1: `เข้าร่วมกิจกรรม ${event.attributes.name} แล้ว ✨` });
            queryClient.invalidateQueries(["getStaffActivities", auth.session.user.id, event.id]);
            queryClient.invalidateQueries(["getPostsFromEventsJoined"])
          },
        }
      );
    }

    // 😺 มีบัคค่อนข้างเยอะ ขอแก้ให้เลยนะ
    // queryClient.invalidateQueries(["getEvents"])
    // const staffs = event.attributes.staffs
    // let userIsStaff = false;
    // if(staffs.data.length > 0){
    //     staffs.data.forEach((staff)=>{
    //       if(staff.attributes.staff.data.id == userId || event.attributes.owner.data.id == userId){
    //         userIsStaff = true
    //         navigation.navigate("EachEventDetails", {eventId:event.id, 
    //                                                   eventName:event.attributes.name, 
    //                                                   eventDescription: event.attributes.description, 
    //                                                   eventPicture: event.attributes.cover?.data, 
    //                                                   eventStart: event.attributes.start, 
    //                                                   eventEnd: event.attributes.end, 
    //                                                   eventOwnerId:event.attributes.owner.data.id.toString() })
    //       }
    //     })
    //     if (!userIsStaff) {
    //       Toast.show({ text1: `คุณไม่ได้เข้าร่วมกิจกรรมนี้ ⚠️` });
    //     }
    // }else{
    // Toast.show({ text1: `คุณไม่ได้เข้าร่วมกิจกรรมนี้ ⚠️` });
    // }
  }

  // add navigation to eachEventPage with params : gear
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>()

  const handleModal = () => {
    setOpeningEventModal?.(true)
    setEvent?.(event)
  }

  return (
    <StyledView>
      <StyledTouchableOpacity intent="plain" onPress={handleEvent} className="px-0">
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
          <StyledTouchableOpacity onPress={handleModal} hasIcon={true} intent="plain" className="absolute bg-white flex-row w-8 h-8 p-0 items-center justify-center right-4 top-4">
            <MaterialCommunityIcons name="dots-horizontal" size={24} color="#777" />
          </StyledTouchableOpacity>
        </StyledView>

        {/* ชื่อกิจกรรม */}
        <StyledView className="flex-row justify-between items-center">
          <StyledView style={{width:250}}>
          <StyledText numberOfLines={1} className="font-noto-semibold text-xl">{event.attributes.name}</StyledText>
          </StyledView>

          {/* ปุ่มเข้าร่วม */}
          <StyledTouchableOpacity
            className="mb-1 flex-row items-center space-x-1"
            size="small"
            intent={intent}
            onPress={handleJoin}
          >
            {joined && (
              <MaterialCommunityIcons name="check" size={18} color="white" />
            )}
            <StyledText className={`font-noto-semibold ${textClass}`}>
              {buttonText}
            </StyledText>
          </StyledTouchableOpacity>
          {/* <JoinButton eventName={event.attributes.name} eventId={event.id} eventOwnerId={event.attributes.owner.data.id} /> */}
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

        <StyledView className="mt-5 border-b border-gray-300">
        </StyledView>
      </StyledTouchableOpacity>
      {/* {events.map((event) => (
        <JoinButton eventName={event.attributes.name} eventId={event.id} eventOwnerId={event.attributes.owner.data.id} />
      ))} */}
    </StyledView>
  );
};

export default EventCard;
