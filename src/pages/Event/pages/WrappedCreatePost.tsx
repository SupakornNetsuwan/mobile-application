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
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import useCreatePost from "../../../core/hooks/Post/useCreatePost";

type Props = {
    eventId: string | undefined,
}

const CreatePost = ({ eventId }: Props) => {
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
                navigation.goBack();
            },
            onError(error, variables, context) {
                console.log(error.response?.data);
            },
        });
    };
    return (
        <>
            <StyledView style={{ flex: 1 }} className="bg-white">
                <ScrollView className="px-8 bg-white">
                    <StyledView>
                        <StyledView className="px-0 mt-6">
                            <Controller
                                control={control}
                                name="title"
                                render={({ field: { onChange, onBlur, value, ref } }) => {
                                    return (
                                        <StyledTextInput
                                            onChangeText={onChange}
                                            value={value}
                                            ref={ref}
                                            className="px-0 rounded-none font-noto-semibold text-xl text-black"
                                            placeholder="กรุณาเพิ่มหัวข้อ"
                                        />
                                    )
                                }}
                            />
                        </StyledView>
                        <StyledView className="border-b border-gray-300 my-2"></StyledView>
                        <StyledView>
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
                                            className="rounded-none px-0"
                                            style={{ minHeight: 500 }}
                                        />
                                    )
                                }}
                            />
                        </StyledView>
                    </StyledView>
                </ScrollView>
                <StyledView className="m-4">
                    <UploadPostPicture />
                    <StyledTouchableOpacity
                        onPress={handleSubmit(onSubmitCreate)}
                        hasIcon={true}
                        intent="primary"
                        size="medium"
                        className="relative w-full flex-row justify-center items-center space-x-2"
                        icon={<MaterialCommunityIcons name="plus-circle" size={20} color="white" />}
                    >
                        <StyledText className="text-white text-lg font-noto-semibold"> {"สร้างโพสต์"}</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
            {/* </StyledView> */}
        </>
    )
}

type CreatePostProp = {
    route: RouteProp<RootPostStackParamsList, 'CreatePost'>; // Adjust this line
    navigation: MaterialTopTabNavigationProp<RootPostStackParamsList, 'CreatePost'>
}
const WrappedCreatePost = ({ route, navigation }: CreatePostProp) => {
    const eventId = route.params.eventId
    return (
        <CreatePostFormProvider >
            <CreatePost eventId={eventId?.toString()} />
        </CreatePostFormProvider>
    );
};
export default WrappedCreatePost