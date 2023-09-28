import React, { useState } from "react";
import {
  StyledText,
  StyledView,
  StyledImage,
  StyledTextInput,
  StyledTouchableOpacity,
} from "../../../core/components/styled";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { EditProfileSchemaType } from "../providers/EditProfileFormProvider";
import EditProfileFormProvider from "../providers/EditProfileFormProvider";
import { ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import UploadProfilePicture from "../components/UploadProfilePicture";
import useUpdateProfile from "../../../core/hooks/useUpdateProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

const EditProfile = () => {
  const { session } = useAuthen();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const queryClient = useQueryClient();

  if (session === "loading" || !session) return null;

  const updateProfile = useUpdateProfile(session?.user.id.toString());

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContext<EditProfileSchemaType>();

  const onSubmit: SubmitHandler<EditProfileSchemaType> = (data) => {
    updateProfile?.mutate(data, {
      onSuccess(data, variables, context) {
        Toast.show({ text1: "อัปเดตข้อมูลสำเร็จ" });
        queryClient.invalidateQueries(["getProfile", session.user.id.toString()]);
      },
      onError(error, variables, context) {
        console.log(error.response?.data.error);
      },
    });
  };

  return (
    <ScrollView className="p-8">
      <StyledView>
        <StyledView>
          <Controller
            control={control}
            name="firstname"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <StyledTextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="ชื่อจริง"
                  hasIcon={true}
                  icon={
                    <MaterialCommunityIcons
                      name="badge-account-horizontal-outline"
                      size={24}
                      color="rgb(107,114,128)"
                      style={{ position: "absolute", top: "50%", left: 10, transform: [{ translateY: -12 }] }}
                    />
                  }
                />
              );
            }}
          />
          {errors.firstname && (
            <StyledText className="text-red-500 text-xs mt-2">{errors.firstname?.message}</StyledText>
          )}
        </StyledView>
        <StyledView className="mt-2">
          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <StyledTextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="นามสกุล"
                  hasIcon={false}
                />
              );
            }}
          />
          {errors.lastname && <StyledText className="text-red-500 text-xs mt-2">{errors.lastname?.message}</StyledText>}
        </StyledView>
        <StyledView className="mt-8 flex-row space-x-2 items-center">
          <StyledView className="flex-1 h-full bg-white relative items-center rounded-lg">
            <MaterialCommunityIcons
              name="cake-variant-outline"
              size={24}
              color="rgb(107,114,128)"
              style={{ position: "absolute", top: "50%", left: 10, transform: [{ translateY: -12 }] }}
            />

            <StyledText className="mt-2 font-noto-semibold text-purple-primary">
              {!watch("birthdate") ? "ยังไม่กำหนด" : dayjs(watch("birthdate")).format("DD/MM/YYYY")}
            </StyledText>
          </StyledView>
          <StyledTouchableOpacity intent="secondary" onPress={() => setShowDatePicker(true)}>
            <StyledText className="text-purple-primary">ตั้งวันเกิด</StyledText>
          </StyledTouchableOpacity>
          {showDatePicker && (
            <Controller
              control={control}
              name="birthdate"
              render={({ field: { onChange, value } }) => {
                return (
                  <DateTimePicker
                    value={new Date(value)}
                    mode="date"
                    is24Hour={true}
                    onChange={(e) => {
                      onChange(e.nativeEvent.timestamp);
                      setShowDatePicker(false);
                    }}
                  />
                );
              }}
            />
          )}
          {errors.birthdate && (
            <StyledText className="text-red-500 text-xs mt-2">{errors.birthdate?.message}</StyledText>
          )}
        </StyledView>
        <StyledView className="mt-2">
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <StyledTextInput
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="ที่อยู่"
                  hasIcon={true}
                  style={{ textAlignVertical: "top" }}
                  icon={
                    <MaterialCommunityIcons
                      name="home-city-outline"
                      size={24}
                      color="rgb(107,114,128)"
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 10,
                        transform: [{ translateY: -12 }],
                      }}
                    />
                  }
                />
              );
            }}
          />
          {errors.address && <StyledText className="text-red-500 text-xs mt-2">{errors.address?.message}</StyledText>}
        </StyledView>
        <UploadProfilePicture />
        <StyledTouchableOpacity
          onPress={handleSubmit(onSubmit)}
          hasIcon={false}
          intent="primary"
          size="medium"
          className="flex-row justify-center mt-8"
        >
          <StyledText className="text-lg font-medium text-white">แก้ไข</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

/**
 * @description ทำการห่อหุ้ม EditProfile ด้วย EditProfileFormProvider เพื่อให้สามารถใช้งาน React Hook Form Context ได้
 */

const WrappedEditProfile = () => {
  return (
    <EditProfileFormProvider>
      <EditProfile />
    </EditProfileFormProvider>
  );
};

export default WrappedEditProfile;
