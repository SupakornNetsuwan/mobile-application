import React from "react";
import { StyledText, StyledView, StyledTouchableOpacity } from "../../../core/components/styled";
import DocumentPicker from "react-native-document-picker";

const UploadProfilePicture = () => {
  const uploadProfilePicture = async () => {
    const file = await DocumentPicker.pickSingle({});
  };
  return (
    <StyledView>
      <StyledTouchableOpacity intent="secondary" onPress={uploadProfilePicture}>
        <StyledText className="text-purple-primary">เลือกรูปโปรไฟล์</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default UploadProfilePicture;
