import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledImage, StyledText, StyledView, StyledTouchableOpacity } from "../../../../core/components/styled";
import EmptyData from "../../../Account/components/EmptyData";
import type { ManageStackRouterType } from "../ManageStackRouter";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { ScrollView } from "react-native";
import { RootPostStackParamsList } from "../PostStackRouter";
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { useMemo } from "react";
import useGetStaffs from "../../../../core/hooks/useGetStaffs";
import useGetEvent from "../../../../core/hooks/useGetEvent";

type Props = {
  route: RouteProp<ManageStackRouterType, 'ManageEvent'>; // Adjust this line
  navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
}
import type { StaffType } from "../../../../core/hooks/useGetStaffs";
type StaffDetailProps = {
  staff: StaffType | undefined,
  eventName: string,
  eventDescription: string,
  eventPicture: PictureType
}

const StaffDetailsComponent = ({ staff, eventName, eventDescription, eventPicture }: StaffDetailProps) => {
  const navigate = useNavigation<NavigationProp<ManageStackRouterType>>()
  const navigateToEditStaff = () => {
    const staffData = {
      eventName: eventName,
      eventDescription: eventDescription,
      eventPicture: eventPicture || undefined,
      staffDuty: staff?.attributes.duty || undefined,
      staffPosition: staff?.attributes.position || undefined,
      staffPicture: staff?.attributes.staff.data?.attributes.picture.data || undefined,
      staffUsername: staff?.attributes.staff.data?.attributes.username || undefined,
      staffStudentId: staff?.attributes.staff.data.attributes.email.split("@")[0],
      staffId: staff?.id
    };
    navigate.navigate("EditStaff", staffData);
  };
  return (
    <StyledView className="flex flex-row justify-between items-center bg-white p-2 border-b border-gray-300">
      <StyledView className="flex flex-row items-center p-1">
        {staff?.attributes.staff.data?.attributes.picture.data != null ? <StyledImage
          source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${staff?.attributes.staff.data?.attributes.picture.data.attributes.url}` }}
          className="h-8 aspect-square rounded-full"
          style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
        /> : <StyledImage
          source={require("../../../../../assets/empty-box.png")}
          className="h-8 aspect-square rounded-full w-8"
          style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2, }}
        />}
        <StyledView className="ml-2">
          <StyledText className="text-sm font-bold mb-1">{staff?.attributes.staff.data?.attributes.username}</StyledText>
          {staff?.attributes.position != null ?
            <StyledText className="text-xs first-line:text-gray-600">{staff?.attributes.position}</StyledText> : null}
        </StyledView>
      </StyledView>
      <StyledView>
        <StyledTouchableOpacity className="flex flex-row  bg-white items-center gap-1"
          onPress={navigateToEditStaff}
        >
          <StyledText className="text-gray-500 text-sm">จัดการ</StyledText>
          < MaterialCommunityIcons name="account-arrow-right" size={20} color="gray" />
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  )
}
type PictureType = {
  attributes: {
    url: string
  }
}
const ManageEvent = ({ route, navigation }: Props) => {
  const eventId = route.params?.eventId
  const eventName = route.params?.eventName
  const eventDescription = route.params?.eventDescription
  const eventPicture = route.params?.eventPicture as PictureType
  const eventStart = route.params?.eventStart
  const eventEnd = route.params?.eventEnd
  const { data, isLoading, error } = useGetStaffs(eventId.toString())!;
  const staffs = useMemo(() => data?.data, [data?.data]);

  const numberOfStaff = 10
  const navigate = useNavigation<NavigationProp<ManageStackRouterType>>()
  const navigateToEditEvent = () => {
    navigate.navigate("EditEvent", { eventId: eventId });
  };

  return (
    <StyledView className="bg-white">
      <ScrollView nestedScrollEnabled={true} decelerationRate={0.2}>
        <StyledView className="bg-white border-b border-b-gray-300">

          {eventPicture != null ? <StyledImage
            className="w-full aspect-video"
            source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${eventPicture.attributes.url}` }}
            onError={(error) => console.log('Image load error:', error)}
          /> :
            <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full" style={{ height: "44%" }} />}
          <StyledTouchableOpacity hasIcon={true} onPress={navigateToEditEvent} intent="plain" className="absolute bg-white flex-row p-1 px-2 items-center justify-center right-4 top-5">
            <MaterialCommunityIcons name="square-edit-outline" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
            <StyledText className="text-purple-primary text-base font-noto-semibold">แก้ไข</StyledText>
          </StyledTouchableOpacity>

          <StyledView className="p-4">
            <StyledText className="text-3xl text-purple-primary font-noto-bold">{eventName}</StyledText>
            <StyledText className="text-gray-500 text-sm">{eventDescription}</StyledText>
          </StyledView>

        </StyledView>
        <StyledView className="p-2">
          {staffs?.data && Array.from({ length: staffs?.data.length }, (_, index) => (
            <StaffDetailsComponent staff={staffs?.data[index]} eventName={eventName} eventDescription={eventDescription} eventPicture={eventPicture} key={index} />
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default ManageEvent
