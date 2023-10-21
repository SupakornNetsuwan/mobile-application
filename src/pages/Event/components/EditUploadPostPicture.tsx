import React, { useEffect, useMemo, useState } from "react";
import { StyledText, StyledView, StyledTouchableOpacity, StyledImage } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUploadFile from "../../../core/hooks/useUploadFile";
import { useFormContext } from "react-hook-form";
import pickImage from "../../../utils/pickImage";
import type {EditPostFormSchemaType} from "../providers/EditPostFormProvider";
import useGetPost from "../../../core/hooks/useGetPost";

type EditUploadPostPictureProp ={
    postId:string
}
const EditUploadPostPicture = ({postId}:EditUploadPostPictureProp) => {
    const { setValue, getValues } = useFormContext<EditPostFormSchemaType>();
    const [postPicture, setPostPicture] = useState<string>("")
    const uploadFile = useUploadFile();
    const [tempImageUri, setTempImageUri] = useState<string>("");
    const clearPicture = ()=> {
      setTempImageUri("")
      setPostPicture("")
    }
    
    const {data, isLoading, error} = useGetPost({postId})!
    const postDetails = useMemo(() => data?.data, [data?.data]);
    useEffect(()=>{
        if(postDetails?.data.attributes.medias.data != null){
            setPostPicture(postDetails?.data.attributes.medias.data[0].attributes.url)
        }
    }, [postDetails])
    const uploadPostPostPicture = async () => {
        const receive = await pickImage();
        if (!receive) return;
        const { imageName, imageUri } = receive;
        const formData = new FormData();
        // @ts-ignore
        formData.append("files", {
          uri: imageUri,
          name: imageName,
          type: "image/jpeg",
        });
    
        uploadFile.mutate(formData, {
          onSuccess(data, variables, context) {
            setValue("medias", data.data[0].id.toString());
            setTempImageUri(imageUri);
          },
          onError(error, variables, context) {
            console.log("Upload image 🔴");
            console.log(error.response?.data.error);
          },
        });
      };
      return (
        <StyledView className="mt-2"> 
          {(tempImageUri || postPicture) &&
            <StyledView className="mt-6 mb-4 flex-row items-center justify-center bg-pink-primary w-full h-40 rounded-md">
              {(tempImageUri || postPicture) &&
                <StyledImage
                  source={{
                    uri: tempImageUri || `${process.env.EXPO_PUBLIC_BACKEND_URL}${postPicture}`
                  }}
                  className="w-full aspect-video"
                />
              }
              <StyledTouchableOpacity
                intent="primary"
                onPress={clearPicture}
                size="small"
                icon={
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color='white'
                  />
                }
                hasIcon={true}
                className="flex-row justify-center absolute rounded-full py-2 right-3 bottom-0"
              ></StyledTouchableOpacity>
            </StyledView>}
          {(tempImageUri == "" || postPicture != "")
          &&<StyledTouchableOpacity
            intent="secondary"
            onPress={uploadPostPostPicture}
            icon={
              <MaterialCommunityIcons
                name="image-outline"
                size={24}
                color={process.env.EXPO_PUBLIC_PRIMARY_COLOR}
              />
            }
            hasIcon={true}
            className="flex-row justify-center mb-5"
          >
            <StyledText className="text-purple-primary">
              เพิ่มรูปโพสต์
            </StyledText>
          </StyledTouchableOpacity >}

        </StyledView>
      );
}
export default EditUploadPostPicture