import React, { useMemo, useState } from "react";
import { StyledText, StyledView, StyledTouchableOpacity, StyledImage } from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useUploadFile from "../../../core/hooks/useUploadFile";
import { useFormContext } from "react-hook-form";
import { EditProfileSchemaType } from "../providers/EditProfileFormProvider";
import pickImage from "../../../utils/pickImage";
import useGetProfile from "../../../core/hooks/useGetProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";

const UploadProfilePicture = () => {
  const { setValue, getValues } = useFormContext<EditProfileSchemaType>();
  const uploadFile = useUploadFile();

  const authen = useAuthen();
  if (authen.status === "loading") return <Loading />;
  if (authen.status === "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

  const { data } = useGetProfile(authen.session.user.id.toString())!;
  const profile = useMemo(() => data?.data, [data?.data]);

  const [tempImageUri, setTempImageUri] = useState("");

  if (uploadFile.isLoading)
    return (
      <StyledView className="bg-white rounded w-fill h-24 items-center justify-center mt-2">
        <StyledText className="text-gray-500">Loading...</StyledText>
      </StyledView>
    );

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
      {(tempImageUri || profile?.picture?.url) && (
        <StyledView className="p-4 mt-2 flex-row justify-center bg-white w-full">
          <StyledImage
            source={{ uri: tempImageUri || `${process.env.EXPO_PUBLIC_BACKEND_URL}${profile?.picture?.url}` }}
            className="w-1/2 aspect-square rounded-lg mt-2"
          />
        </StyledView>
      )}
    </StyledView>
  );
};

export default UploadProfilePicture;
