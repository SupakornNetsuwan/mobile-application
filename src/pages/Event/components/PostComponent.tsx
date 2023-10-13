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

    return (
        <>

            <StyledView  className="border-b border-gray-300">
                <StyledView className="flex flex-row gap-3 p-2">
                    <StyledImage
                            source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${owner.data.attributes.picture.data.attributes.url}`}}
                            className="h-14 aspect-square rounded-full"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                        />
                    <StyledView className="p-1">
                        <StyledText className="text-sm font-bold m-1">{owner.data.attributes.username}</StyledText>
                        <StyledText className="text-xs text-gray-500">{owner.data.attributes.activities.data[0].attributes.position}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </>
    )
}
type DetailPostProps = {
    title :string,
    contents:string,
    medias: MediaType,
    owner:OwnerType
}
const PostDetailViewComponent:React.FC<DetailPostProps>= ({title, contents, medias}) =>{
    let url = true
    let imageUrl = ""
    if(medias.data != null && medias.data[0].attributes) {
        console.log(medias.data[0].attributes.url)
        url  = true
        imageUrl = medias.data[0].attributes.url
    }else{
        url = false
    }
    
    return(
        <>
            <StyledView className="p-2 border-b  border-gray-300 h-20">
                <StyledView className="h-20">
                    <StyledText className="text-lg font-bold mb-1">{title}</StyledText>
                    <StyledText className="text-sm text-gray-500">{contents}</StyledText>
                            <StyledView className="h-20">
                                <StyledImage
                                    source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${imageUrl}`}}
                                    className="aspect-square w-full h-22"
                                    style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                                />
                            </StyledView>
                </StyledView>
            </StyledView>
        </>
    )

}
const CommentsViewComponent = () =>{
    const numberOfComments = 4;
    return(
        <>
            <StyledView className="bg-green-500">

                    <StyledView className="flex flex-row items-center w-full h-10 p-2">
                        < MaterialCommunityIcons name="comment-outline" size={28} color="black" />
                        <StyledText className="ml-3">Comment</StyledText>
                    </StyledView>
                    <ScrollView style={{marginHorizontal: 20, height:200}} nestedScrollEnabled={true} decelerationRate={0.1}>
                        {Array.from({ length: numberOfComments }, (_, index) => (
                            <Comment/>
                            ))}
                    </ScrollView>
                    <StyledView className="border-t border-gray-300 pl-4 pr-4 pb-4">
                        <StyledTextInput className="border h-9 mt-5 border-gray-300 rounded-3xl"></StyledTextInput>
                    </StyledView>
            </StyledView>
        </>
    )
}
const Comment = ()=>{
    return(
        <StyledView className="mb-2">
            <StyledView className="flex flex-row gap-3 p-2 ">
                <StyledImage
                            source={{ uri:"https://cdn.discordapp.com/attachments/1019966926014910516/1149367750121242764/IMG_1576.png?ex=65314d21&is=651ed821&hm=3ee19ac28f5d7bd361ea5b1575cc94584a4a13a905ca09402ae17b2cee5c4c35&"}}
                            className="h-12 aspect-square rounded-full"
                            style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                    />
                <StyledView className=" p-1">
                    <StyledText className="text-sm font-bold m-1">นายปันจ์ วะชังเงิน</StyledText>
                    <StyledText className="text-xs text-gray-500">ประธานค่าย | 11/9/2023 13.25</StyledText>
                </StyledView>
            </StyledView>
            <StyledText>
                <StyledText className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntLorem ipsum dolor sit amet, consectetur adipiscing elit,</StyledText>
            </StyledText>
        </StyledView>
    )
}


const PostComponent: React.FC<PostType> = ({attributes, id, }) =>{
    const postDetails = attributes
    return (
        <>
            <StyledView className="mb-5 p-2  border border-gray-300 rounded-xl "
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
                <StyledView  className="border-b border-gray-300">
                    <StyledView className="flex flex-row gap-3 p-2">
                        <StyledImage
                                source={{ uri: `${process.env.EXPO_PUBLIC_BACKEND_URL}${attributes.owner.data.attributes.picture.data.attributes.url}`}}
                                className="h-14 aspect-square rounded-full"
                                style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                            />
                        <StyledView className="p-1">
                            <StyledText className="text-sm font-bold m-1">{attributes.owner.data.attributes.username}</StyledText>
                            <StyledText className="text-xs text-gray-500">{attributes.owner.data.attributes.activities.data[0].attributes.position}</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
                {/* <PostDetailViewComponent title={attributes.title} contents={attributes.content} medias={attributes.medias}/> */}
            </StyledView>
        </>
    )
}

export default PostComponent