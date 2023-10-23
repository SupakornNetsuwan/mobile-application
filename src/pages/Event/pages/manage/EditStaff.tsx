
import { StyledView, StyledText, StyledImage, StyledTextInput, StyledTouchableOpacity } from "../../../../core/components/styled"
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { ManageStackRouterType } from "../../routers/ManageStackRouter";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
type EditStaffProps = {
    route: RouteProp<ManageStackRouterType, 'EditStaff'>
    navigation: StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
}
import EditStaffFormProvider, { EditStaffSchemaType } from "../../providers/EditStaffFormProvider";
import useUpdateStaff from "../../../../core/hooks/useUpdateStaff";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import useGetEvent from "../../../../core/hooks/useGetEvent";
import LoadingActivityindicator from "../../../../core/components/LoadingActivityindicator";
import { useMemo } from "react";

const EditStaff = ({ route, navigation }: EditStaffProps) => {
    const eventId = route.params.eventId

    const {data, isLoading, error} = useGetEvent(eventId)!
    const event = useMemo(() => data?.data.data, [data?.data.data])!;

    if (isLoading) {
        return <LoadingActivityindicator />
    }

    const eventName = event.attributes.name
    const eventDescription = event.attributes.description
    const eventPicture = event.attributes.cover.data

    const staffDuty = route.params.staffDuty
    const staffPicture = route.params.staffPicture
    const staffPositon = route.params.staffPosition
    const staffUsername = route.params.staffUsername
    const staffStudentId = route.params.staffStudentId
    const staffid = route.params.staffId
    const queryClient = useQueryClient()
    const updateStaff = useUpdateStaff(staffid as string)
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
        register
    } = useFormContext<EditStaffSchemaType>();

    const onSubmitt: SubmitHandler<EditStaffSchemaType> = (data) => {
        updateStaff?.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "อัพเดทผู้เข้าร่วมสำเร็จ" });
                queryClient.invalidateQueries(["getPosts"]);
            },
            onError(error, variables, context) {
                console.log(error.response?.data);
            },
        })
    }
    return (
        <ScrollView>
            <StyledView className="bg-white h-full">
                {eventPicture != null ? <StyledImage
                    className="w-full aspect-video"
                    source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${eventPicture.attributes.url}` }}
                    onError={(error) => console.log('Image load error:', error)}
                /> :
                    <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full" style={{ height: "44%" }} />}
                <StyledTouchableOpacity onPress={() => (navigation.navigate("EditEvent", {eventId:eventId}))} hasIcon={true} intent="plain" className="absolute bg-white flex-row p-1 px-2 items-center justify-center right-4 top-5">
                    <MaterialCommunityIcons name="square-edit-outline" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                    <StyledText className="text-purple-primary text-base font-noto-semibold">แก้ไข</StyledText>
                </StyledTouchableOpacity>
                <StyledView className="p-4">
                    <StyledText className="text-3xl text-purple-primary font-noto-bold">{eventName}</StyledText>
                    <StyledText className="text-gray-500 text-sm">{eventDescription}</StyledText>
                </StyledView>
                <StyledView className="bg-gray-100 px-5 py-10">
                    <StyledView className="items-center">
                        {staffPicture?.attributes ? <StyledImage
                            source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${staffPicture.attributes.url}` }}
                            className="h-16 aspect-square rounded-full mb-2"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                        /> :
                            <StyledImage
                                source={require("../../../../../assets/empty-box.png")}
                                className="h-16 aspect-square rounded-full mb-2"
                                style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                            />}
                        <StyledView className="ml-2 items-center gap-2">
                            <StyledText className="text-xl font-noto-bold ">{staffUsername}</StyledText>
                            <StyledText className="text-sm  text-gray-500 ">{staffStudentId}</StyledText>
                        </StyledView>
                    </StyledView>

                    <StyledTouchableOpacity intent="plain" className="absolute flex-row items-center" onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" size={24} color="gray" />
                        <StyledText className="text-gray-500">ย้อนกลับ</StyledText>
                    </StyledTouchableOpacity>

                </StyledView>
                <StyledView className="px-4 py-6 gap-1 space-y-6">
                    <StyledView className="flex flex-row items-end justify-center space-x-2">
                        <MaterialCommunityIcons color="#787878" name="hail" size={34} style={{ transform: [{ translateY: -4 }], }} />
                        <StyledView className="w-80">
                            <StyledText className="text-sm text-gray-500 pl-4">หน้าที่</StyledText>
                            <Controller
                                control={control}
                                name="position"
                                render={({ field: { onChange, onBlur, value, ref } }) => {
                                    return (
                                        <StyledTextInput
                                            onChangeText={onChange}
                                            value={value}
                                            ref={ref}
                                            className="border-b border-gray-300"
                                            placeholder={staffPositon}
                                        />
                                    )
                                }}
                            />
                        </StyledView>
                    </StyledView>
                    <StyledView className="flex flex-row items-end justify-center space-x-2">
                        <MaterialCommunityIcons color="#787878" name="clipboard-account-outline" size={34} style={{ transform: [{ translateY: -4 }, { translateX: -2 }], }} />
                        <StyledView className="w-80">
                            <StyledText className="text-sm text-gray-500 pl-4">ระดับ</StyledText>
                            <Controller
                                control={control}
                                name="duty"
                                render={({ field: { onChange, onBlur, value, ref } }) => {
                                    return (
                                        <StyledTextInput
                                            onChangeText={onChange}
                                            value={value}
                                            ref={ref}
                                            className="border-b border-gray-300"
                                            placeholder={staffDuty}
                                        />
                                    )
                                }}
                            />
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledView>
                    <StyledTouchableOpacity
                        onPress={handleSubmit(onSubmitt)}
                        intent="primary"
                        size="medium"
                        className="flex-row justify-center items-center mx-4 mb-6"
                    >
                        <StyledText className="text-white text-lg font-noto-semibold">แก้ไข</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </ScrollView>
    )
}


const WrappedEditStaff = ({ route, navigation }: EditStaffProps) => {
    return (
        <EditStaffFormProvider starffId={route.params.staffId as string}>
            <EditStaff route={route} navigation={navigation}></EditStaff>
        </EditStaffFormProvider>)

}
export default WrappedEditStaff
