
import { StyledView, StyledText, StyledImage, StyledTextInput } from "../../../../core/components/styled"
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ManageStackRouterType } from "../../routers/ManageStackRouter";
import {  RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
type EditStaffProps ={
    route: RouteProp<ManageStackRouterType, 'EditStaff'>
    navigation : StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
}
const EditStaff = ({route, navigation}:EditStaffProps ) =>{
    const eventName = route.params?.eventName
    const eventDescription = route.params?.eventDescription
    const eventPicture  = route.params?.eventPicture
    console.log(eventPicture)
    const staffDuty = route.params.staffDuty
    const staffPicture = route.params.staffPicture
    const staffPositon = route.params.staffPosition
    const staffUsername = route.params.staffUsername
    const staffStudentId = route.params.staffStudentId
    return(
        <ScrollView>
            <StyledView className="bg-white h-full"> 
            { eventPicture?.attributes?  <StyledImage
                                source={{ uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${eventPicture.attributes.url}`}}
                                style={{ width: '100%', height: 220 }} 
                                onError={(error) => console.log('Image load error:', error)}
                            />:
                        <StyledImage
                                source={require("../../../../../assets/profile-backdrop.png")}
                                style={{ width: '100%', height: 220 }} 
                                onError={(error) => console.log('Image load error:', error)}
                            />}
                <StyledView className="mt-2 ml-4 mr-4 mb-2">
                    <StyledText className="text-3xl  text-purple-primary font-bold mb-1">{eventName}</StyledText>
                <StyledText className="text-gray-500 text-sm">{eventDescription}</StyledText>
                </StyledView>
                <StyledView className="bg-gray-100 p-5 ">
                    <StyledView className="items-center">
                        { staffPicture?.attributes?  <StyledImage
                                source={{ uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${staffPicture.attributes.url}`}}
                                className="h-16 aspect-square rounded-full mb-2"
                                style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                            />:
                        <StyledImage
                                source={require("../../../../../assets/empty-box.png")}
                                className="h-16 aspect-square rounded-full mb-2"
                                style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                            />}
                        <StyledView className="ml-2 items-center gap-2">
                            <StyledText className="text-xl font-bold ">{staffUsername}</StyledText>
                            <StyledText className="text-sm  text-gray-500 ">{staffStudentId}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledView className="p-2 gap-1">
                    <StyledView className="flex flex-row items-center p-1">
                        <MaterialCommunityIcons name="hail" size={36}></MaterialCommunityIcons>
                        <StyledView className="w-full">
                            <StyledText className="text-sm text-gray-500 pl-4">หน้าที่</StyledText>
                            <StyledTextInput
                                // onChangeText={onChange}
                                // value={value}
                                // ref={ref}
                                className="border-b border-gray-300"
                                placeholder={staffPositon}
                            />
                        </StyledView>
                    </StyledView>
                    <StyledView className="flex flex-row items-center">
                        <MaterialCommunityIcons name="clipboard-account-outline" size={36}></MaterialCommunityIcons>
                        <StyledView className="w-full">
                            <StyledText className="text-sm text-gray-500 pl-4">ระดับ</StyledText>
                            <StyledTextInput
                                // onChangeText={onChange}
                                // value={value}
                                // ref={ref}
                                className="border-b border-gray-300"
                                placeholder={staffDuty}
                            />
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </ScrollView>
    )
}

export default EditStaff