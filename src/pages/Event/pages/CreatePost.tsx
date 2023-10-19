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
const CreatePost = () =>{

    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootPostStackParamsList>>();
    const createPost = useCreatePost()!
    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
      } = useFormContext<PostFormSchemaType>();
    
    const onSubmit: SubmitHandler<PostFormSchemaType> = (data) => {
        createPost.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "สร้างกิจกรรมสำเร็จ" });
                queryClient.invalidateQueries(["getEvents"]);
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
                <StyledView>
                    <UploadPostPicture />
                </StyledView>
                <StyledTouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        hasIcon={false}
                        intent="primary"
                        size="medium"
                        className="flex-row justify-center items-center my-6 space-x-2"
                    >
                    <MaterialCommunityIcons name="plus-circle" size={20} color="white" />
                    <StyledText className="text-white text-lg font-noto-semibold">สร้าง</StyledText>
                </StyledTouchableOpacity>
            </ScrollView>
        </>
    )
}
const WrappedCreatePost = () => {
    return (
      <PostFormProvider>
        <CreatePost />
      </PostFormProvider>
    );
  };
export default WrappedCreatePost