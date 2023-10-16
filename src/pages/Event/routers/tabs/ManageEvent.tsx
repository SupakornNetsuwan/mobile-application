import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledImage, StyledText, StyledView, StyledTouchableOpacity } from "../../../../core/components/styled";
import EmptyData from "../../../Account/components/EmptyData";
import type { ManageStackRouterType } from "../ManageStackRouter";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { ScrollView } from "react-native";




const StaffDetailsComponent = () =>{
  
  const navigate = useNavigation<NavigationProp<ManageStackRouterType>>()
  const navigateToEditStaff = () => navigate.navigate("EditStaff")
  return (
      <StyledView className="flex flex-row justify-between items-center bg-white p-2 border-b border-gray-300">
          <StyledView className="flex flex-row items-center p-1">
              <StyledImage
                      source={{ uri:"https://cdn.discordapp.com/attachments/1019966926014910516/1149367750121242764/IMG_1576.png?ex=65314d21&is=651ed821&hm=3ee19ac28f5d7bd361ea5b1575cc94584a4a13a905ca09402ae17b2cee5c4c35&"}}
                      className="h-8 aspect-square rounded-full"
                      style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                  />
              <StyledView className="ml-2">
                  <StyledText className="text-xs font-bold ">นายปันจ์ วะชังเงิน</StyledText>
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
const ManageEvent = () => {
  const numberOfStaff = 10
  return (
    <StyledView className="bg-white">
       <ScrollView nestedScrollEnabled={true} decelerationRate={0.2}>
        <StyledView className="bg-white border-b border-b-gray-300">
          <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full h-22" />
          <StyledView className="mt-2 ml-4 mr-4 mb-2">
            <StyledText className="text-3xl  text-purple-primary font-bold mb-1">ITCAMP19</StyledText>
            <StyledText className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="p-2">
          {Array.from({ length: numberOfStaff }, (_, index) => (
            <StaffDetailsComponent key={index}/>
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default ManageEvent
