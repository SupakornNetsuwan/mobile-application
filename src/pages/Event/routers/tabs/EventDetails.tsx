import React from "react";
import { useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledImage, StyledText, StyledView, StyledTouchableOpacity } from "../../../../core/components/styled";
import EmptyData from "../../../Account/components/EmptyData";
// componets
import { ScrollView } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { RootPostStackParamsList } from "../PostStackRouter";
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import type { EventsStackRouterType } from "../../../Events/routers/EventsStackRouter";
//hooks
import useGetPosts from "../../../../core/hooks/useGetPosts";
import WrappedCreateComment from "../../components/WrappedCreateComment";
import useGetEvent from "../../../../core/hooks/useGetEvent";

type Props = {
  route: RouteProp<RootPostStackParamsList, 'InEventDetails'>;
  navigation: MaterialTopTabNavigationProp<EventsStackRouterType, 'EachEventDetails'>

};
type PictureType = {
  attributes: {
    url: string
  }
}
const EventDetails = ({ route, navigation }: Props) => {
  const navigate = useNavigation<NavigationProp<RootPostStackParamsList>>()
  const navigateToCreatePost = () => navigate.navigate("CreatePost", { eventId: eventId })
  const eventId = route.params?.eventId

  const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEvent(eventId)!;
  const event = useMemo(() => eventData?.data.data, [eventData?.data.data])!;

  const { data: postsData, isLoading: postsIsLoading, error: postsError } = useGetPosts(eventId.toString())!;
  const posts = useMemo(() => postsData?.data, [postsData?.data])!;

  if (eventIsLoading || postsIsLoading) {
    return <StyledText>Loading...</StyledText>
  }

  const eventName = event.attributes.name
  const eventDescription = event.attributes.description
  const eventPicture = event.attributes.cover.data.attributes.url
  const eventStart = event.attributes.start
  const eventEnd = event.attributes.end

  if (postsData == null) {
    return <EmptyData label="No event found" />
  }
  const postInEvent = posts?.data
  
  return (
    <StyledView className="flex-1">
      <ScrollView nestedScrollEnabled={true} decelerationRate={0.2} contentContainerStyle={{ flexGrow: 1 }}>
        <StyledView className="bg-white">

            {eventPicture != null ? <StyledImage
              className="w-full aspect-video"
              source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${eventPicture}` }}
              onError={(error) => console.log('Image load error:', error)}
            /> :
              <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full" style={{ height: "40%" }} />}

          <StyledView className="p-4">
            <StyledText className="text-3xl text-purple-primary font-noto-bold">{eventName}</StyledText>
            <StyledText className="text-gray-500 text-sm">{eventDescription}</StyledText>
          </StyledView>
          
          <StyledView className="justify-center pl-4 pr-4 pt-3 w-full border-t border-t-gray-300 ">

            <StyledTouchableOpacity intent="plain" className="bg-green-100 flex-row items-center space-x-1 p-1 rounded-md mb-3">
              <MaterialCommunityIcons name="calendar" size={24} color="#5CC98C" />
              <StyledText className="font-noto-semibold">
                {eventStart} ถึง {eventEnd}
              </StyledText>
            </StyledTouchableOpacity>

            {postInEvent && postInEvent.length > 0 ? (
              Array.from({ length: postInEvent.length }, (_, index) => (
                <WrappedCreateComment attributes={postInEvent[index].attributes} id={postInEvent[index].id} key={index} eventId={eventId} />
              ))
            ) : (
              <>
                <StyledView className="mt-20">
                  <EmptyData label="No post found" />
                </StyledView>
              </>
            )}
          </StyledView>
        </StyledView>
      </ScrollView>
      {/* เพิ่ม Post */}
      <StyledTouchableOpacity className=" border-opacity-20 flex items-center justify-center w-16 h-16 absolute bottom-8 right-5 rounded-full"
        style={{ backgroundColor: "#B146C2" }}
        onPress={navigateToCreatePost}
      >
        <StyledText className="text-purple-primary text-2xl font-noto-semibold bg-white block aspect-square text-center leading-10 rounded-full">
          +
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};
export default EventDetails;
