import React, { useState } from "react";
import { StyledText, StyledView, StyledTouchableOpacity, StyledImage } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUploadFile from "../../../core/hooks/useUploadFile";
import { useFormContext } from "react-hook-form";
import { EditProfileSchemaType } from "../providers/EditProfileFormProvider";
import pickImage from "../../../utils/pickImage";

const UploadProfilePicture = () => {
  const { setValue } = useFormContext<EditProfileSchemaType>();
  const [tempImageUri, setTempImageUri] = useState("");
  const uploadFile = useUploadFile();

  const uploadProfilePicture = async () => {
    const receive = await pickImage();

    if (!receive) return;

    const { imageName, imageUri } = receive;

    const formData = new FormData();

    // @ts-ignore
    formData.append("files", { uri: imageUri, name: imageName, type: "image/jpeg" });

    uploadFile.mutate(formData, {
      onSuccess(data, variables, context) {
        setValue("pictureId", data.data[0].id.toString());
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
        onPress={uploadProfilePicture}
        icon={<MaterialCommunityIcons name="upload" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />}
        hasIcon={true}
        className="flex-row justify-center"
      >
        <StyledText className="text-purple-primary">เลือกรูปโปรไฟล์</StyledText>
      </StyledTouchableOpacity>
      {tempImageUri && (
        <StyledView className="p-4 mt-2 flex-row justify-center bg-white w-full">
          <StyledImage source={{ uri: tempImageUri }} className="w-1/2 aspect-square rounded-lg mt-2" />
        </StyledView>
      )}
    </StyledView>
  );
};

export default UploadProfilePicture;
