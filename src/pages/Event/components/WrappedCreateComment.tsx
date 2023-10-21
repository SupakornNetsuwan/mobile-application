import React, { useState, useRef} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledText, StyledView, StyledTextInput, StyledImage, StyledTouchableOpacity, } from "../../../core/components/styled";
import { ScrollView } from "react-native";
//types
import { PostType, OwnerType, MediaType} from "../../../core/hooks/useGetPosts";
import { Placement } from "react-native-popover-view/dist/Types";
import { Button, Popover, Modal } from "native-base";
import useAuthen from "../../../core/hooks/useAuthen";
import useDeletePost from "../../../core/hooks/Post/useDeletePost";
import {  useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import CommentFormProvider, { CommentFormSchemaType } from "../providers/CommentFormProvider";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import type { RootPostStackParamsList } from "../routers/PostStackRouter";
type CommentProp = {
    contents: string
    owner:OwnerType
}
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import useCreateComment from "../../../core/hooks/Comment/useCreateComment";

const Comment = ({contents, owner}:CommentProp)=>{
    if(!owner) return <ScrollView/>
    return(
        <StyledView className="mb-2 border-b border-gray-300 pb-2">
            <StyledView className="flex flex-row gap-3 p-2 ">
                {owner && owner.data.attributes.picture.data != null ? <StyledImage
                            source={{ uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${owner.data.attributes.picture.data.attributes.url}`}}
                            className="h-12 aspect-square rounded-full w-12"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                    /> :   <StyledImage
                    source={require("../../../../assets/empty-box.png")}
                    className="h-12 aspect-square rounded-full w-12"
                    style={{
                            borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                            borderWidth: 2,
                     }}
                    />
                }
                <StyledView className=" p-1">
                    <StyledText className="text-sm font-bold m-1">{owner ? owner.data.attributes.username : "ไม่ผบผู้ใช้"}</StyledText>
                    <StyledText className="text-xs text-gray-500 pl-1">{owner.data.attributes.activities.data.length > 0 && owner.data.attributes.activities.data[0].attributes.position != null ?owner.data.attributes.activities.data[0].attributes.position : "ผู้เข้าร่วม" }</StyledText>
                </StyledView>
            </StyledView>
            <StyledText>
                <StyledText className="text-sm text-gray-500">{contents}</StyledText>
            </StyledText>
        </StyledView>
    )
}



const PostComponent: React.FC<PostType> = ({attributes, id, eventId}) =>{
    const navigate = useNavigation<NavigationProp<RootPostStackParamsList>>()
    const auth = useAuthen()
    const postDetails = attributes
    const postId = id
    const navigateToEditPost = () => navigate.navigate("EditPost", {postId: postId as number})
    const createAt= new Date(postDetails.createdAt)
    const options = { timeZone: 'Asia/Bangkok', hour12: false };
    const createAtBKK = createAt.toLocaleString('en-US', options).replace(/, /g, ':')
    const touchable = useRef(null);
    const [showDeleteOverlay, setShowDeleteOverlay] = useState<boolean>(false)
    const deletePost = useDeletePost() 
    const queryClient = useQueryClient()
    const createComment = useCreateComment()!
    if(auth.status =='loading' || auth.status == 'unauthenticated') return null
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

    const handleDelatePost = () => {
        deletePost?.mutate(
            {postId: postId},
            {
                onSuccess() {
                  Toast.show({ text1: `ลบโพสต์เรียบร้อยแล้ว 😿` });
                  queryClient.invalidateQueries(["getPosts"]);
                },
              }
        )
    }
    return (
            <StyledView
                className="mb-5 p-2 border border-gray-300 rounded-xl"
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
                        <StyledView className="flex flex-row gap-3 p-2">
                            {postDetails.owner.data.attributes.picture.data != null ? (
                                <StyledImage
                                    source={{
                                    uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${postDetails.owner.data.attributes.picture.data.attributes.url}`,
                                    }}
                                    className="h-16 aspect-square rounded-full w-16"
                                    style={{
                                    borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                                    borderWidth: 2,
                                    }}
                                />
                                ) : (
                                <StyledImage
                                    source={require("../../../../assets/empty-box.png")}
                                    className="h-16 aspect-square rounded-full w-16"
                                    style={{
                                    borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                                    borderWidth: 2,
                                    }}
                                />
                                )
                            }
                            <StyledView className="p-1">
                                <StyledText className="text-sm font-bold m-1">
                                    {postDetails.owner.data.attributes.username}
                                </StyledText>
                                <StyledText className="text-xs text-gray-500 ml-1">
                                    {postDetails.owner.data.attributes.activities.data[0].attributes.position == null ? "ผู้เข้าร่วม" :postDetails.owner.data.attributes.activities.data[0].attributes.position}  | {createAtBKK}
                                </StyledText>
                            </StyledView>
                        </StyledView>
                        {/* editPost */}
                        <StyledTouchableOpacity className="bg-white" ref={touchable} >
                            <Popover  trigger={triggerProps => {
                                return <Button {...triggerProps}   style={{backgroundColor:"white"}}>
                                            <MaterialCommunityIcons name="dots-horizontal" size={20}></MaterialCommunityIcons>
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
                                            </StyledTouchableOpacity>:null}
                                        {auth.session.user.id === postDetails.owner.data.id ?
                                        <StyledTouchableOpacity className="flex flex-row items-center bg-white " onPress={()=>setShowDeleteOverlay(!showDeleteOverlay)}>
                                            <MaterialCommunityIcons name="delete-off" size={20}></MaterialCommunityIcons>
                                        <StyledText className="text-sm ml-2">ลบ</StyledText>
                                        </StyledTouchableOpacity>:null}
                                        <StyledTouchableOpacity className="flex flex-row items-center bg-white">
                                            <MaterialCommunityIcons name="share" size={20}></MaterialCommunityIcons>
                                            <StyledText className="text-sm ml-2">แชร์</StyledText>
                                        </StyledTouchableOpacity>
                                    </Popover.Body>
                                    </Popover.Content>
                            </Popover>
                        </StyledTouchableOpacity> 
                    </StyledView>
                </StyledView>
                <StyledView className="mt-2 border-b border-gray-300">
                    <StyledText className="text-lg font-bold mb-1 ml-2 mt-2">{postDetails.title}</StyledText>
                    <StyledText className="text-sm text-gray-500 ml-2 mb-5">{postDetails.content}</StyledText>
                    {postDetails.medias && postDetails.medias.data && postDetails.medias.data[0] ? (
                        <StyledImage
                            source={{
                                uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${postDetails.medias.data[0].attributes.url}`,
                            }}
                            className="aspect-square w-full h-22 rounded-lg"
                        />
                        ) : (
                            <StyledView />
                        )
                    }
                    <StyledView className="mt-2  border-t border-gray-300 pl-2 pt-4">
                            <StyledView className="flex flex-row items-center mb-2">
                                <MaterialCommunityIcons name={"comment-outline"} size={22} ></MaterialCommunityIcons>
                                <StyledText className="ml-2 text-sm">Comments</StyledText>
                            </StyledView>
                            <ScrollView style={{marginHorizontal: 20}} nestedScrollEnabled={true} decelerationRate={0.1}>
                                {postDetails.comments.data && postDetails.comments.data.length > 0 ? ( Array.from({ length: postDetails.comments.data.length }, (_, index) => (
                                            <Comment 
                                                key={index}
                                                contents={postDetails.comments.data[index].attributes.content && postDetails.comments.data[index].attributes.content}   
                                                owner={postDetails.comments.data[index].attributes.owner && postDetails.comments.data[index].attributes.owner}
                                            />
                                            ))):<StyledView/>} 
                            </ScrollView>   
                    </StyledView>
                    <StyledView className="pr-4 pl-4">
                        <StyledView className="bt-4  pr-4 pb-4 flex flex-row justify-between items-center mt-5 ">
                            <Controller
                                    control={control}
                                    name="content"
                                        render={({ field: { onChange, onBlur, value, ref,name } }) => {
                                                return(
                                                        <StyledTextInput 
                                                            onBlur={onBlur}
                                                            className="border h-9  border-gray-300 rounded-3xl w-8/12"
                                                            value={value}
                                                            onChangeText={onChange}
                                                            ref={ref}
                                                            
                                                            />
                            )}}/>
                            <StyledTouchableOpacity 
                                    onPress={handleSubmit(onSubmit)}
                                    className="bg-white text-center"
                            >
                                <StyledText className="text-center">Comments</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                </StyledView>
                {/* Delete Overlay */}
                    <Modal isOpen={showDeleteOverlay} onClose={() => setShowDeleteOverlay(false)}  justifyContent="flex-end" bottom="4" size="full">
                        <Modal.Content>
                            <Modal.Body>
                                <StyledView>
                                    <StyledTouchableOpacity className="flex flex-row bg-white w-24" onPress={()=>{setShowDeleteOverlay(!showDeleteOverlay)}}>
                                        <MaterialCommunityIcons name="arrow-left" size={20}></MaterialCommunityIcons>
                                        <StyledText className="ml-2">ย้อนกลับ</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-lg">ยืนยันที่จะลบหรือไม่</StyledText>
                                    <StyledText className="text-red-500 text-sm">เมื่อคุณลบโพสต์นี้แล้ว จะไม่มีทางกลับมาได้อีก</StyledText>
                                    <StyledView  className="flex flex-row item-center">
                                        <StyledText className="text-red-500 text-sm">กรุณาตรวจสอบก่อนที่จะดำเนินการลบ</StyledText>
                                        <MaterialCommunityIcons name={"delete"} size={15}></MaterialCommunityIcons>
                                    </StyledView>
                                </StyledView>
                                <StyledTouchableOpacity className=" mt-2 mb-2" onPress={handleDelatePost}>
                                    <StyledText className="text-white text-center">ยืนยัน</StyledText>
                                </StyledTouchableOpacity>
                                <StyledTouchableOpacity className="bg-white" onPress={()=>{setShowDeleteOverlay(!showDeleteOverlay)}}>
                                    <StyledText className="text-center">ย้อนกลับ</StyledText>
                                </StyledTouchableOpacity>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </StyledView>
            </StyledView>
    )
}



const WrappedCreateComment : React.FC<PostType> = ({attributes, id, eventId}) =>{
    return (
        <CommentFormProvider>
            <PostComponent attributes={attributes} id={id} eventId={eventId}></PostComponent>
        </CommentFormProvider>
    )
}
export default WrappedCreateComment