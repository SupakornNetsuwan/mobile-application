import React from "react";
import { useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledImage, StyledText, StyledView,StyledTouchableOpacity } from "../../../../core/components/styled";
import EmptyData from "../../../Account/components/EmptyData";
// componets
import PostComponent from "../../components/PostComponent";
import { ScrollView } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/core";

import type { RootPostStackParamsList } from "../PostStackRouter";
//hooks
import useGetEvent from "../../../../core/hooks/useGetEvent";
import useGetPost from "../../../../core/hooks/useGetPost";


const EventDetails = () => {
  const navigate = useNavigation<NavigationProp<RootPostStackParamsList>>()
  const navigateToCreatePost = () => navigate.navigate("CreatePost")

  const {data, isLoading, error} = useGetPost("1")!;
  const posts = useMemo(() => data?.data, [data?.data]);
  if(data == null){
    return <EmptyData label="No event found"/>
  }
  const postInEvent = posts?.data
  console.log(postInEvent)
  return (
    <StyledView className="flex-1"> 
      <ScrollView nestedScrollEnabled={true} decelerationRate={0.2} contentContainerStyle={{flexGrow: 1}}>
        <StyledView className="bg-white" >
          <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full h-22" />
          <StyledView className="mt-2 ml-4 mr-4 mb-2">
            <StyledText className="text-3xl  text-purple-primary font-bold mb-1"></StyledText>
            <StyledText className="text-gray-500 text-sm"></StyledText>
          </StyledView>
          <StyledView className="justify-center pl-4 pr-4 pt-3 w-full border-t border-t-gray-300 ">
            <StyledView className="flex flex-row bg-green-100 rounded-lg p-1 text-center w-full h-8 items-center mb-5">
                < MaterialCommunityIcons name="alarm" size={17} color="green" />
                <StyledText className="ml-1 font-bold text-sm">
                      
                </StyledText>
            </StyledView>
              {postInEvent && postInEvent.length > 0 ? (
                  Array.from({ length: postInEvent.length }, (_, index) => (
                    <PostComponent attributes={postInEvent[index].attributes} id={postInEvent[index].id}/>
                  ))
                ) : (
                <>
                  <StyledView className="mt-20">
                    <EmptyData label="No post found"/>
                  </StyledView>
                </> 
              )}
          </StyledView>
        </StyledView>
      </ScrollView>
      <StyledTouchableOpacity className=" border-opacity-20 flex items-center justify-center w-16 h-16 absolute bottom-10 right-5 rounded-full"
          style={{backgroundColor:"#B146C2"}}
          onPress={navigateToCreatePost}
        >
          < MaterialCommunityIcons name="plus-circle-outline" size={30} color="white" />
        </StyledTouchableOpacity>
    </StyledView>
  );
};
export default EventDetails;
