import React, { useState } from "react";
import useUploadFile from "../../../core/hooks/useUploadFile";
import { useFormContext } from "react-hook-form";
import { AddEventSchemaType } from "../providers/AddEventFormProvider";
import pickImage from "../../../utils/pickImage";
import {
  StyledView,
  StyledTouchableOpacity,
  StyledText,
  StyledImage,
} from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const UploadEventCover = () => {
  const { setValue, getValues } = useFormContext<AddEventSchemaType>();
  const uploadFile = useUploadFile();
  const [tempImageUri, setTempImageUri] = useState("");

  const uploadEventCover = async () => {
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
        setValue("cover", data.data[0].id.toString());
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
      <StyledTouchableOpacity
        intent="secondary"
        onPress={uploadEventCover}
        icon={
          <MaterialCommunityIcons
            name="image-outline"
            size={24}
            color={process.env.EXPO_PUBLIC_PRIMARY_COLOR}
          />
        }
        hasIcon={true}
        className="flex-row justify-center"
      >
        <StyledText className="text-purple-primary">
          เพิ่มรูปปกกิจกรรม
        </StyledText>
      </StyledTouchableOpacity>
      {tempImageUri && (
        <StyledView className="mt-6 mb-4 flex-row items-center justify-center bg-pink-primary w-full h-40 rounded-md">
          <StyledImage
            source={{
              uri: tempImageUri,
            }}
            className="w-full aspect-video"
          />
          <StyledTouchableOpacity
            intent="primary"
            onPress={() => setTempImageUri("")}
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
        </StyledView>
      )}
    </StyledView>
  );
};

export default UploadEventCover;
