import { StyledView, StyledImage, StyledTextInput, StyledTouchableOpacity, StyledText } from "../../../core/components/styled";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import EditUploadPostPicture from "../components/EditUploadPostPicture";
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
    postId:string|undefined,
}
import EditPostFormProvider from "../providers/EditPostFormProvider";
import { EditPostFormSchemaType } from "../providers/EditPostFormProvider";
const EdidtPost = ({postId}:Props) =>{
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootPostStackParamsList>>();
    const updatePost = useUpdatePost(postId as string)!
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
      } = useFormContext<EditPostFormSchemaType>();
    
    const onSubmitEdit: SubmitHandler<EditPostFormSchemaType> = (data) => {
        if (!data.medias) delete data.medias;

        updatePost.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "แก้ไขโพสสำเร็จ" });
                queryClient.invalidateQueries(["getPosts"]);
                queryClient.invalidateQueries(["getPostsFromEventsJoined"]);
                navigation.goBack()
          },
          onError(error, variables, context) {
            console.log("err",error.response?.data);
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
                        <EditUploadPostPicture postId={postId as string} />
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
                        onPress={handleSubmit(onSubmitEdit)}
                        hasIcon={true}
                        intent="primary"
                        size="medium"
                        className="flex-row justify-center items-center my-6 space-x-2"
                        icon={<MaterialCommunityIcons name="plus-circle" size={20} color="white" />}
                    >
                    <StyledText className="text-white text-lg font-noto-semibold"> {"แก้ไขโพสต์"}</StyledText>
                </StyledTouchableOpacity>
            </ScrollView>
        </>
    )
}

type CreatePostProp = {
    route: RouteProp<RootPostStackParamsList, 'EditPost'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
}
const WrappedEditPost= ({route, navigation}:CreatePostProp) => {
    const postId= route.params.postId?.toString()

    return (
      <EditPostFormProvider postId={postId} >
        <EdidtPost  postId={postId}/>
      </EditPostFormProvider>
    );
  };
export default WrappedEditPost