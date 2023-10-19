import { StyledView, StyledImage, StyledTextInput, StyledTouchableOpacity, StyledText } from "../../../core/components/styled";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import UploadPostPicture from "../components/UploadPostPicture";
import PostFormProvider, { PostFormSchemaType } from "../providers/PostFormProvider";

import { useQueryClient } from "@tanstack/react-query";
import useCreatePost from "../../../core/hooks/Post/useCreatePost";
import Toast from "react-native-toast-message";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { RootPostStackParamsList } from "../routers/PostStackRouter";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import useUpdatePost from "../../../core/hooks/Post/useUpdatePost";
type Props ={
    eventId:string|undefined,
    isEdit:boolean|undefined,
    postId:string|undefined,
}
const CreatePost = ({eventId, isEdit, postId}:Props) =>{
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootPostStackParamsList>>();
    const createPost = useCreatePost()!
    const updatePost = useUpdatePost(postId as string)
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
      } = useFormContext<PostFormSchemaType>();
    
    const onSubmitCreate: SubmitHandler<PostFormSchemaType> = (data) => {
        console.log("CreatePost")
        data.event = eventId;
        console.log(data)
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
    const onSubmitEdit: SubmitHandler<PostFormSchemaType> = (data) => {
        data.event = eventId
        console.log(data)
        updatePost?.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "อัพเดทโพสต์สำเร็จ" });
                queryClient.invalidateQueries(["getPosts"]);
                navigation.navigate('InEventDetails');
          },
          onError(error, variables, context) {
            console.log(error.response?.data.data);
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
                        <UploadPostPicture isEdit={isEdit} postId={postId} />
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
                        onPress={isEdit ? handleSubmit(onSubmitEdit):handleSubmit(onSubmitCreate)}
                        hasIcon={true}
                        intent="primary"
                        size="medium"
                        className="flex-row justify-center items-center my-6 space-x-2"
                        icon={<MaterialCommunityIcons name="plus-circle" size={20} color="white" />}
                    >
                    <StyledText className="text-white text-lg font-noto-semibold">{isEdit ? "แก้ไขโพสต์": "สร้างโพสต์"}</StyledText>
                </StyledTouchableOpacity>
            </ScrollView>
        </>
    )
}

type CreatePostProp = {
    route: RouteProp<RootPostStackParamsList, 'CreatePost'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
}
const WrappedCreatePost= ({route, navigation}:CreatePostProp) => {
    const eventId= route.params.eventId?.toString()
    const isEdit = route.params.isEdit
    const postId  = route.params.postId
    return (
      <PostFormProvider postId={postId} eventIdParam={eventId} isEdit={isEdit} >
        <CreatePost eventId={eventId} isEdit={isEdit} postId={postId}/>
      </PostFormProvider>
    );
  };
export default WrappedCreatePost