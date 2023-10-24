import React, { useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledText, StyledView, StyledTextInput, StyledImage, StyledTouchableOpacity, } from "../../../core/components/styled";
import { ScrollView } from "react-native";
//types
import { PostType, OwnerType, MediaType } from "../../../core/hooks/useGetPosts";
import { Placement } from "react-native-popover-view/dist/Types";
// import { Button, Popover, Modal } from "native-base";
import useAuthen from "../../../core/hooks/useAuthen";
import useDeletePost from "../../../core/hooks/Post/useDeletePost";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import CommentFormProvider, { CommentFormSchemaType } from "../providers/CommentFormProvider";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { RootPostStackParamsList } from "../routers/PostStackRouter";
type CommentProp = {
    contents: string
    owner: OwnerType
}
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import useCreateComment from "../../../core/hooks/Comment/useCreateComment";
import convertISOToCustomFormat from "../../../utils/convertISOToCustomFormat";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import PostModal from "./PostModal";

const Comment = ({ contents, owner }: CommentProp) => {
    if (!owner) return <ScrollView />
    return (
        <StyledView>
            <StyledView className="flex-row space-x-1">
                {owner && owner.data.attributes.picture.data != null ? <StyledImage
                    source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${owner.data.attributes.picture.data.attributes.url}` }}
                    className=" aspect-square rounded-full w-12 h-12"
                    style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                /> : (
                    <StyledView className="rounded-full w-12 h-12 bg-purple-primary" style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}>
                        <MaterialCommunityIcons
                            name="account"
                            size={24}
                            color="white"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 10,
                                transform: [{ translateY: -13 }],
                            }}
                        />
                    </StyledView>)
                }
                <StyledView>
                    <StyledText className="text-sm font-noto-semibold m-1">{owner ? owner.data.attributes.username : "ไม่ผบผู้ใช้"}</StyledText>
                    <StyledText className="text-xs text-gray-500 pl-1">{owner.data.attributes.activities.data.length > 0 && owner.data.attributes.activities.data[0].attributes.position != null ? owner.data.attributes.activities.data[0].attributes.position : "ประธานค่าย"}</StyledText>
                </StyledView>
            </StyledView>
            <StyledText className="mt-2">
                <StyledText className="text-gray-500">{contents}</StyledText>
            </StyledText>
        </StyledView>
    )
}



const PostComponent: React.FC<PostType & { setOpeningPostModal?: (newType: boolean) => void, setPostId?: (newType: number) => void, setOwnerId?: (newType: number) => void }> = ({ attributes, id, eventId, setOpeningPostModal, setOwnerId, setPostId }) => {
    const navigate = useNavigation<NavigationProp<RootPostStackParamsList>>()
    const auth = useAuthen()

    const postDetails = attributes
    const postId = id
    const navigateToEditPost = () => navigate.navigate("EditPost", { postId: postId as number })
    const createAt = new Date(postDetails.createdAt)
    const options = { timeZone: 'Asia/Bangkok', hour12: false };
    const createAtBKK = createAt.toLocaleString('en-US', options).replace(/, /g, ':')
    const touchable = useRef(null);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState<boolean>(false)
    const deletePost = useDeletePost()
    const queryClient = useQueryClient()
    const createComment = useCreateComment()!
    if (auth.status == 'loading' || auth.status == 'unauthenticated') return null

    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
        register
    } = useFormContext<CommentFormSchemaType>();

    const onSubmit: SubmitHandler<CommentFormSchemaType> = (data) => {
        data.postId = postId.toString()
        data.owner = auth.session.user.id.toString()
        createComment.mutate(data, {
            onSuccess(data, variables, context) {
                Toast.show({ text1: "สร้างคอมเมนต์สำเร็จ" });
                queryClient.invalidateQueries(["getPosts"]);
            },
            onError(error, variables, context) {
                console.log(error.response?.data);
            },
        });
    }

    // const handleDelatePost = () => {
    //     deletePost?.mutate(
    //         { postId: postId },
    //         {
    //             onSuccess() {
    //                 Toast.show({ text1: `ลบโพสต์เรียบร้อยแล้ว 😿` });
    //                 queryClient.invalidateQueries(["getPosts"]);
    //             },
    //         }
    //     )
    // }

    const handleModal = () => {
        setOpeningPostModal?.(true)
        setPostId?.(postId)
        setOwnerId?.(postDetails.owner.data.id)
    }

    return (
        <StyledView
            id={id.toString()}
            className="mb-5 p-2 border border-gray-300 rounded-xl bg-white"
            style={{
                shadowColor: "#E0E0E0",
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 2,
            }}
        >
            <StyledView className="border-b border-gray-300">
                <StyledView className="flex flex-row justify-between">
                    <StyledView className="flex flex-row space-x-1 pt-2 pb-4 px-2">
                        {postDetails.owner.data.attributes.picture.data != null ? (
                            <StyledImage
                                source={{
                                    uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${postDetails.owner.data.attributes.picture.data.attributes.url}`,
                                }}
                                className="aspect-square rounded-full w-14"
                                style={{
                                    borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                                    borderWidth: 2,
                                }}
                            />
                        ) : (
                            <StyledView className="rounded-full w-14 h-14 bg-purple-primary" style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}>
                                <MaterialCommunityIcons
                                    name="account"
                                    size={24}
                                    color="white"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: 14,
                                        transform: [{ translateY: -13 }],
                                    }}
                                />
                            </StyledView>
                        )
                        }
                        <StyledView className="p-1 justify-center" style={{ width: 284 }}>
                            <StyledView className="flex-row w-full justify-between">
                                <StyledText className="text-base font-noto-semibold">
                                    {postDetails.owner.data.attributes.username}
                                </StyledText>
                                <TouchableOpacity onPress={handleModal}>
                                    <MaterialCommunityIcons name="dots-horizontal" size={24} color="#777" />
                                </TouchableOpacity>
                            </StyledView>
                            <StyledText className="text-gray-500">
                                {postDetails.owner.data.attributes.activities.data[0] ? postDetails.owner.data.attributes.activities.data[0].attributes.position : "ประธานค่าย"} | {convertISOToCustomFormat(postDetails.createdAt)}
                            </StyledText>
                        </StyledView>

                    </StyledView>
                    {/* editPost */}
                    {/* <StyledTouchableOpacity className="bg-white" ref={touchable} >
                        <Popover trigger={triggerProps => {
                            return <Button {...triggerProps} style={{ backgroundColor: "white" }}>
                                <MaterialCommunityIcons name="dots-horizontal" size={20} />
                            </Button>;
                        }}>
                            <Popover.Content accessibilityLabel="Manage" w="56">
                                <Popover.Arrow />
                                <Popover.CloseButton />

                                <Popover.Body >
                                    <StyledView className="items-center mb-3">
                                        <StyledText>จัดการ</StyledText>
                                    </StyledView>
                                    {auth.session.user.id === postDetails.owner.data.id ?
                                        <StyledTouchableOpacity
                                            className="flex flex-row items-center bg-white"
                                            onPress={navigateToEditPost}
                                        >
                                            <MaterialCommunityIcons name="pencil" size={20}></MaterialCommunityIcons>
                                            <StyledText className="text-sm ml-2">แก้ไข</StyledText>
                                        </StyledTouchableOpacity> : null}
                                    {auth.session.user.id === postDetails.owner.data.id ?
                                        <StyledTouchableOpacity className="flex flex-row items-center bg-white " onPress={() => setShowDeleteOverlay(!showDeleteOverlay)}>
                                            <MaterialCommunityIcons name="delete-off" size={20}></MaterialCommunityIcons>
                                            <StyledText className="text-sm ml-2">ลบ</StyledText>
                                        </StyledTouchableOpacity> : null}
                                    <StyledTouchableOpacity className="flex flex-row items-center bg-white">
                                        <MaterialCommunityIcons name="share" size={20}></MaterialCommunityIcons>
                                        <StyledText className="text-sm ml-2">แชร์</StyledText>
                                    </StyledTouchableOpacity>
                                </Popover.Body>
                            </Popover.Content>
                        </Popover>
                    </StyledTouchableOpacity> */}
                </StyledView>
                {/* <Line /> */}
            </StyledView>
            <StyledView className="px-2 py-3 space-y-1">
                <StyledText className="text-xl font-noto-semibold">{postDetails.title}</StyledText>
                <StyledText className="text-gray-500">{postDetails.content}</StyledText>
                <StyledView className="pt-2">{postDetails.medias && postDetails.medias.data && postDetails.medias.data[0] && (
                    <StyledImage
                        source={{
                            uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${postDetails.medias.data[0].attributes.url}`,
                        }}
                        className="aspect-square w-full h-22 rounded-lg mb-4"
                    />
                )
                }</StyledView>
                <StyledView className="border-b border-gray-300 my-2"></StyledView>
                {/* <StyledView className="py-2"><Line /></StyledView> */}
                <StyledView>
                    <StyledView className="flex flex-row items-center mb-2">
                        <MaterialCommunityIcons name={"comment-outline"} size={22} ></MaterialCommunityIcons>
                        <StyledText className="ml-2">ความคิดเห็น</StyledText>
                    </StyledView>
                    <ScrollView nestedScrollEnabled={true} decelerationRate={0.1}>
                        {postDetails.comments.data && postDetails.comments.data.length > 0 && (Array.from({ length: postDetails.comments.data.length }, (_, index) => (
                            <StyledView key={index} className="my-2">
                                <Comment
                                    contents={postDetails.comments.data[index].attributes.content && postDetails.comments.data[index].attributes.content}
                                    owner={postDetails.comments.data[index].attributes.owner && postDetails.comments.data[index].attributes.owner}
                                />
                            </StyledView>
                        )))}
                    </ScrollView>
                </StyledView>
                <StyledView>
                    <StyledView className="flex-row justify-between items-center">
                        <StyledView style={{ width: "90%" }}>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field: { onChange, onBlur, value, ref, name } }) => {
                                    return (
                                        <StyledTextInput
                                            onBlur={onBlur}
                                            className="border border-gray-300 rounded-3xl w-full"
                                            value={value}
                                            onChangeText={onChange}
                                            ref={ref}
                                        />
                                    )
                                }} />
                        </StyledView>
                        <StyledTouchableOpacity
                            intent="plain"
                            style={{ width: "13%" }}
                            onPress={handleSubmit(onSubmit)}
                            className="items-center justify-center"
                        >
                            <MaterialCommunityIcons
                                name="send"
                                size={24}
                                color="rgb(107,114,128)"
                            />
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
                {/* Delete Overlay */}
                {/* <Modal isOpen={showDeleteOverlay} onClose={() => setShowDeleteOverlay(false)} justifyContent="flex-end" bottom="4" size="full">
                    <Modal.Content>
                        <Modal.Body>
                            <StyledView>
                                <StyledTouchableOpacity className="flex flex-row bg-white w-24" onPress={() => { setShowDeleteOverlay(!showDeleteOverlay) }}>
                                    <MaterialCommunityIcons name="arrow-left" size={20}></MaterialCommunityIcons>
                                    <StyledText className="ml-2">ย้อนกลับ</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                            <StyledView className="items-center">
                                <StyledText className="text-lg">ยืนยันที่จะลบหรือไม่</StyledText>
                                <StyledText className="text-red-500 text-sm">เมื่อคุณลบโพสต์นี้แล้ว จะไม่มีทางกลับมาได้อีก</StyledText>
                                <StyledView className="flex flex-row item-center">
                                    <StyledText className="text-red-500 text-sm">กรุณาตรวจสอบก่อนที่จะดำเนินการลบ</StyledText>
                                    <MaterialCommunityIcons name={"delete"} size={15}></MaterialCommunityIcons>
                                </StyledView>
                            </StyledView>
                            <StyledTouchableOpacity className=" mt-2 mb-2" onPress={handleDelatePost}>
                                <StyledText className="text-white text-center">ยืนยัน</StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity className="bg-white" onPress={() => { setShowDeleteOverlay(!showDeleteOverlay) }}>
                                <StyledText className="text-center">ย้อนกลับ</StyledText>
                            </StyledTouchableOpacity>
                        </Modal.Body>
                    </Modal.Content>
                </Modal> */}
            </StyledView>
        </StyledView>
    )
}



const WrappedCreateComment: React.FC<PostType & { setOpeningPostModal?: (newType: boolean) => void, setOwnerId?: (newType: number) => void, setPostId?: (newType: number) => void } > = ({ attributes, id, eventId, setOpeningPostModal, setOwnerId, setPostId }) => {
    return (
        <>
            <CommentFormProvider>
                <PostComponent setOpeningPostModal={setOpeningPostModal} attributes={attributes} id={id} eventId={eventId} setOwnerId={setOwnerId} setPostId={setPostId}></PostComponent>
            </CommentFormProvider>
            {/* <PostModal openingPostModal={openingPostModal} setOpeningPostModal={setOpeningPostModal} owner={attributes.owner} postId={id} /> */}
        </>
    )
}
export default WrappedCreateComment