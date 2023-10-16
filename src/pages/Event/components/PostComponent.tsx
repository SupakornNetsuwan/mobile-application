import React, { useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledText, StyledView, StyledTextInput, StyledImage, } from "../../../core/components/styled";
import { ScrollView } from "react-native";
import useGetPost from "../../../core/hooks/useGetPost";
//types
import { PostType, OwnerType, MediaType} from "../../../core/hooks/useGetPost";
type TopPostViewComponentProps = {
    owner: OwnerType
}
const TopPostViewComponent:React.FC<TopPostViewComponentProps>= ({owner}) =>{
    let url = false
    let imageUrl = ""
    if(owner!= null && owner.data) {
        if(owner.data.attributes.picture.data){
            url=true
            imageUrl=owner.data.attributes.picture.data.attributes.url
        }
    }
    return (
        <>

            <StyledView  className="border-b border-gray-300">
                <StyledView className="flex flex-row gap-3 p-2">
                    {url == true ? 
                     <StyledImage
                            source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${imageUrl}`}}
                            className="h-14 aspect-square rounded-full w-14"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                        /> :  <StyledImage
                        source={require("../../../../assets/empty-box.png")}
                        className="h-14 aspect-square rounded-full w-14"
                        style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                        />}
                    <StyledView className="p-1">
                        <StyledText className="text-sm font-bold m-1">{owner.data.attributes.username}</StyledText>
                        <StyledText className="text-xs text-gray-500">{owner.data.attributes.activities.data[0].attributes.position}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </>
    )
}


type CommentProp ={
    contents: string
    owner:OwnerType
}
const Comment = ({contents, owner}:CommentProp)=>{
    console.log(owner.data.attributes.activities)
    return(
        <StyledView className="mb-2 border-b border-gray-300 pb-2">
            <StyledView className="flex flex-row gap-3 p-2 ">
                {owner.data.attributes.picture.data != null ? <StyledImage
                            source={{ uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${owner.data.attributes.picture.data.attributes.url}`}}
                            className="h-12 aspect-square rounded-full"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                    /> :   <StyledImage
                    source={require("../../../../assets/empty-box.png")}
                    className="h-10 aspect-square rounded-full w-10"
                    style={{
                            borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
                            borderWidth: 2,
                     }}
                    />
                }
                <StyledView className=" p-1">
                    <StyledText className="text-sm font-bold m-1">{owner.data.attributes.username}</StyledText>
                    <StyledText className="text-xs text-gray-500">{owner.data.attributes.activities.data.length > 0 && owner.data.attributes.activities.data[0].attributes.position != null ?owner.data.attributes.activities.data[0].attributes.position : "ผู้เข้าร่วม" }</StyledText>
                </StyledView>
            </StyledView>
            <StyledText>
                <StyledText className="text-sm text-gray-500">{contents}</StyledText>
            </StyledText>
        </StyledView>
    )
}


const PostComponent: React.FC<PostType> = ({attributes, id, }) =>{
    const postDetails = attributes
    const createAt= new Date(postDetails.createdAt)
    const options = { timeZone: 'Asia/Bangkok', hour12: false };
    const createAtBKK = createAt.toLocaleString('en-US', options).replace(/, /g, ':')
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
                            className="h-10 aspect-square rounded-full w-10"
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
            </StyledView>
            <StyledView className="mt-2 border-b border-gray-300">
                <StyledText className="text-lg font-bold mb-1 ml-2">{postDetails.title}</StyledText>
                <StyledText className="text-sm text-gray-500 ml-2">{postDetails.title}</StyledText>
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
                <StyledView className="mt-2  border-t border-gray-300">
                    <ScrollView style={{marginHorizontal: 20, height:200}} nestedScrollEnabled={true} decelerationRate={0.1}>
                        {Array.from({ length: postDetails.comments.data.length }, (_, index) => (
                                    <Comment 
                                        contents={postDetails.comments.data[index].attributes.content}   
                                        owner={postDetails.comments.data[index].attributes.owner}
                                    />
                                    ))}
                    </ScrollView>
                    <StyledView className="border-t border-gray-300 pl-4 pr-4 pb-4">
                            <StyledTextInput className="border h-9 mt-5 border-gray-300 rounded-3xl"></StyledTextInput>
                    </StyledView>
                </StyledView>
            </StyledView>
            
        </StyledView>
    )
}

export default PostComponent