import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView, TouchableOpacity } from "@gorhom/bottom-sheet";
import { StyledText, StyledTouchableOpacity, StyledView } from "../../../core/components/styled";
import useAuthen from "../../../core/hooks/useAuthen";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";
import { useCallback, useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import useDeletePost from "../../../core/hooks/Post/useDeletePost";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { RootPostStackParamsList } from "../routers/PostStackRouter";
import { PostType } from "../../../core/hooks/useGetPosts";

const PostModal: React.FC<{ openingPostModal: boolean, setOpeningPostModal?: (newType: boolean) => void, ownerId?: number, postId?: number }> = ({ openingPostModal, setOpeningPostModal, ownerId, postId }) => {
    const auth = useAuthen();

    if (auth.status == "loading")
        return (<LoadingActivityindicator />);

    if (auth.status == "unauthenticated")
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    // ref
    const postModalRef = useRef<BottomSheetModal>(null);
    const deletePostModalRef = useRef<BottomSheetModal>(null);
    const [openingDeletePostModal, setOpeningDeletePostModal] = useState<boolean>(false);

    useEffect(() => {
        if ((openingPostModal) && postModalRef.current) {
            postModalRef.current.present();
        }
        if ((openingDeletePostModal) && deletePostModalRef.current) {
            deletePostModalRef.current?.present()
        }
    }, [openingPostModal, openingDeletePostModal]);

    const handleEventModalChange = useCallback((index: number) => {
        if (index < 0) {
            postModalRef.current?.close();
            setOpeningPostModal?.(false);
        }
    }, []);

    const handleDeleteEvent = () => {
        setOpeningPostModal?.(false);
        setOpeningDeletePostModal?.(true);
    }

    const handleDeleteEventModalChange = useCallback((index: number) => {
        if (index < 0) {
            deletePostModalRef.current?.close();
            setOpeningDeletePostModal?.(false);
        }
    }, []);

    const renderBackdrop = useCallback(
        // @ts-ignore
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const deletePost = useDeletePost();
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootPostStackParamsList>>();

    const handleEditEvent = (postId?: number) => {
        postModalRef.current?.close();
        setOpeningPostModal?.(false);
        navigation.navigate("EditPost", { postId: postId })
    }

    const handleConfirmDelete = (postId?: number) => {
        deletePost?.mutate(
            { postId: postId },
            {
                onSuccess() {
                    deletePostModalRef.current?.close()
                    setOpeningDeletePostModal?.(false)
                    Toast.show({ text1: `ลบโพสต์เรียบร้อยแล้ว 😿` });
                    queryClient.invalidateQueries(["getPosts"]);
                },
                onError(error, variables, context) {
                    console.log(error.response?.data);
                },
            }
        )
    }

    return (
        <BottomSheetModalProvider>
            {
                openingPostModal && (
                    <StyledView>
                        <BottomSheetModal
                            ref={postModalRef}
                            enableDynamicSizing={true}
                            backdropComponent={renderBackdrop}
                            enableHandlePanningGesture
                            onChange={handleEventModalChange}>
                            <BottomSheetView>
                                <StyledView className='m-5 p-2 rounded-xl bg-gray-100'>
                                    <TouchableOpacity>
                                        <View className="flex-row space-x-2 py-2">
                                            <MaterialCommunityIcons name="share" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                            <StyledText className="text-lg font-noto-semibold text-purple-primary">แชร์</StyledText>
                                        </View>
                                    </TouchableOpacity>

                                    {ownerId == auth.session.user.id && (
                                        <>
                                            <TouchableOpacity onPress={() => handleEditEvent(postId)}>
                                                <View className="flex-row space-x-2 py-2">
                                                    <MaterialCommunityIcons name="cog" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                                    <StyledText className="text-lg font-noto-semibold text-purple-primary">แก้ไขโพสต์</StyledText>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleDeleteEvent}>
                                                <View className="flex-row space-x-2 py-2">
                                                    <MaterialCommunityIcons name="trash-can" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                                    <StyledText className='text-lg font-noto-semibold text-purple-primary'>ลบโพสต์</StyledText>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </StyledView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </StyledView>
                )
            }
            {
                openingDeletePostModal && (
                    <StyledView>
                        <BottomSheetModal
                            ref={deletePostModalRef}
                            enableDynamicSizing={true}
                            backdropComponent={renderBackdrop}
                            enableHandlePanningGesture
                            onChange={handleDeleteEventModalChange}
                        >
                            <BottomSheetView>
                                <StyledView className='rounded-xl justify-center items-center py-10'>
                                    <StyledText className='text-2xl font-noto-bold text-center'>ยืนยันที่จะลบหรือไม่</StyledText>
                                    <StyledText className="px-12 text-center text-base text-red-500">เมื่อคุณลบโพสต์นี้แล้ว จะไม่มีทางกลับมาได้อีก กรุณาตรวจสอบก่อนที่จะดำเนินการลบ 🗑️</StyledText>

                                    <StyledTouchableOpacity
                                        onPress={() => handleConfirmDelete(postId)}
                                        intent="primary"
                                        size="medium"
                                        className="flex-row justify-center items-center space-x-2 mt-6 w-80"
                                    >
                                        <StyledText className="text-white text-lg font-noto-semibold">ยืนยัน</StyledText>
                                    </StyledTouchableOpacity>

                                    <StyledTouchableOpacity
                                        intent="plain"
                                        size="medium"
                                        className="flex-row justify-center items-center space-x-2 mt-2 w-80"
                                        onPress={() => { deletePostModalRef.current?.close; setOpeningDeletePostModal(false) }}
                                    >
                                        <StyledText className="text-lg text-purple-primary">ยกเลิก</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </StyledView>
                )
            }
        </BottomSheetModalProvider>
    )
}

export default PostModal;