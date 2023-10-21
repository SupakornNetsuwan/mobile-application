import { StyledView, StyledImage, StyledTextInput, StyledTouchableOpacity, StyledText } from "../../../core/components/styled";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import UploadPostPicture from "../components/UploadPostPicture";
import CreatePostFormProvider from "../providers/CreatePostFormProvider";
import type { CreatePostFormSchemaType } from "../providers/CreatePostFormProvider";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { RootPostStackParamsList } from "../routers/PostStackRouter";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import useCreatePost from "../../../core/hooks/Post/useCreatePost";
type Props ={
    eventId:string|undefined,
}
const CreatePost = ({eventId}:Props) =>{
    const createPost = useCreatePost()!
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootPostStackParamsList>>();
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
      } = useFormContext<CreatePostFormSchemaType>();
    
    const onSubmitCreate: SubmitHandler<CreatePostFormSchemaType> = (data) => {
        data.event = eventId;
        createPost.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "สร้างโพสต์สำเร็จ" });
                queryClient.invalidateQueries(["getPosts"]);
                navigation.navigate('InEventDetails');
          },
          onError(error, variables, context) {
            console.log(error.response?.data);
          },
        });
    };
    return (
        <>
            <ScrollView >
               <StyledView className="bg-white">
                    <StyledView className="bg-2 pl-4 mb-4">
                        <StyledText className="text-lg">รายละเอียดของโพสต์</StyledText>
                    </StyledView>
                    <StyledView className="w-full">
                        <StyledText className="text-sm text-gray-500 pl-4">หัวข้อ</StyledText>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field: { onChange, onBlur, value, ref } }) => {
                            return (
                                    <StyledTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        ref={ref}
                                        className="border-b border-gray-300"
                                        placeholder="กรุณาเพิ่มหัวข้อ"
                                        />
                                )}}
                                />
                    </StyledView>   
                    <StyledView>
                        <UploadPostPicture />
                     </StyledView>
                     <StyledView className="mt-5">
                         <Controller
                            control={control}
                            name="content"
                            render={({ field: { onChange, onBlur, value, ref } }) => {
                                return (
                                        <StyledTextInput
                                        onChangeText={onChange}
                                        value={value}
                                        ref={ref}
                                        textAlignVertical="top"
                                        multiline={true}
                                        placeholder="กรุณากรอกข้อความ"
                                        />
                                        )}}
                        />
                     </StyledView>
                </StyledView>
                <StyledTouchableOpacity
                        onPress={handleSubmit(onSubmitCreate)}
                        hasIcon={true}
                        intent="primary"
                        size="medium"
                        className="flex-row justify-center items-center my-6 space-x-2"
                        icon={<MaterialCommunityIcons name="plus-circle" size={20} color="white" />}
                    >
                    <StyledText className="text-white text-lg font-noto-semibold"> {"สร้างโพสต์"}</StyledText>
                </StyledTouchableOpacity>
            </ScrollView>
        </>
    )
}

type CreatePostProp = {
    route: RouteProp<RootPostStackParamsList,'CreatePost'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
}
const WrappedCreatePost= ({route, navigation}:CreatePostProp) => {
    const eventId = route.params.eventId
    return (
      <CreatePostFormProvider >
        <CreatePost  eventId={eventId?.toString()}/>
      </CreatePostFormProvider>
    );
  };
export default WrappedCreatePost