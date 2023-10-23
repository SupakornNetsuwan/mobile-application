import React, { useState, useMemo } from "react";
import { StyledView, StyledText, StyledTextInput, StyledTouchableOpacity } from "../../../core/components/styled";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { EventSchemaType } from "../providers/AddEventFormProvider";
import AddEventFormProvider from "../providers/AddEventFormProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Chip from "../components/Chip";
import useAddEvent from "../../../core/hooks/Events/useAddEvent";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { EventsStackRouterType } from "../routers/EventsStackRouter";
import UploadEventCover from "../components/UploadEventCover";
import useGetCategories from "../../../core/hooks/Events/Category/useGetCategories";
import useGetStudentYears from "../../../core/hooks/Events/StudentYear/useGetStudentYear";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

export const AddEvent = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const addEvent = useAddEvent()!;
  const navigation = useNavigation<NavigationProp<EventsStackRouterType>>();

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useFormContext<EventSchemaType>();

  // เมื่อทำการสร้าง event
  const onSubmit: SubmitHandler<EventSchemaType> = (data) => {
    if (!data.cover) delete data.cover;

    addEvent.mutate(data, {
      onSuccess(data, variables, context) {
        Toast.show({ text1: "สร้างกิจกรรมสำเร็จ" });
        queryClient.invalidateQueries(["getEvents"]);
        navigation.navigate("Events");
      },
      onError(error, variables, context) {
        console.log(error.response?.data.error);
      },
    });
  };

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()!;
  const categories = useMemo(() => categoriesData?.data.data, [categoriesData?.data.data])!;

  const { data: studentYearsData, isLoading: studentYearsLoading, error: studentYearsError } = useGetStudentYears()!;
  const studentYears = useMemo(() => studentYearsData?.data.data, [studentYearsData?.data.data])!;

  const categories_chip = {
    icon: "tag-outline",
    items: categories,
  };

  const studentyears_chip = {
    icon: "school-outline",
    items: studentYears,
  };

  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const [studentYearsSelected, setStudentYearsSelected] = useState<number[]>([]);

  const handleCategoriesSelected = (newSelectedChips: number[]) => {
    setCategoriesSelected(newSelectedChips);
  };

  const handleStudentYearsSelected = (newSelectedChips: number[]) => {
    setStudentYearsSelected(newSelectedChips);
  };

  if (categoriesLoading || studentYearsLoading) {
    return <LoadingActivityindicator />
  }

  return (
    <ScrollView className="px-8">
      <StyledView>
        <StyledText className="text-lg color-purple-primary font-noto-semibold mt-6">รายละเอียดกิจกรรม</StyledText>
        <StyledView className="my-2">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <StyledTextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="ชื่อกิจกรรม"
                  hasIcon={true}
                  icon={
                    <MaterialCommunityIcons
                      name="umbrella-beach"
                      size={24}
                      color="rgb(107,114,128)"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: [{ translateY: -12 }],
                      }}
                    />
                  }
                />
              );
            }}
          />
          {errors.name && <StyledText className="text-red-500 text-xs mt-2">{errors.name?.message}</StyledText>}
        </StyledView>

        <StyledView>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <StyledTextInput
                  multiline={true}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  placeholder="คำอธิบายกิจกรรม"
                  hasIcon={true}
                  icon={
                    <MaterialCommunityIcons
                      name="text"
                      size={24}
                      color="rgb(107,114,128)"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: [{ translateY: -12 }],
                      }}
                    />
                  }
                />
              );
            }}
          />
        </StyledView>

        <StyledView>
          <UploadEventCover />
        </StyledView>
      </StyledView>

      <StyledView className="pt-6">
        <StyledText className="text-lg color-purple-primary font-noto-semibold">วันที่ของกิจกรรม</StyledText>
        <StyledView className="flex-row space-x-2 items-center mt-2">
          <StyledView className="flex-1 h-full bg-white relative items-center rounded-lg">
            <MaterialCommunityIcons
              name="calendar"
              size={24}
              color="rgb(107,114,128)"
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: [{ translateY: -12 }],
              }}
            />
            <StyledText className="mt-2 font-noto-semibold text-purple-primary">
              {!watch("start") ? "ยังไม่กำหนด" : dayjs(watch("start")).format("DD/MM/YYYY")}
            </StyledText>
          </StyledView>
          <StyledView style={{ flex: 0.5 }}>
            <StyledTouchableOpacity intent="secondary" onPress={() => setShowStartDatePicker(true)}>
              <StyledText className="text-purple-primary text-center">ตั้งวันเริ่ม</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          {showStartDatePicker && (
            <Controller
              control={control}
              name="start"
              render={({ field: { onChange, value } }) => {
                return (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={(e, selectedDate) => {
                      if (selectedDate) {
                        onChange(new Date(e.nativeEvent.timestamp as number).toISOString());
                      }
                      setShowStartDatePicker(false);
                    }}
                  />
                );
              }}
            />
          )}
        </StyledView>
        <StyledView className="flex-row space-x-2 items-center mt-2">
          <StyledView className="flex-1 h-full bg-white relative items-center rounded-lg">
            <MaterialCommunityIcons
              name="calendar"
              size={24}
              color="rgb(107,114,128)"
              style={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: [{ translateY: -12 }],
              }}
            />
            <StyledText className="mt-2 font-noto-semibold text-purple-primary">
              {!watch("end") ? "ยังไม่กำหนด" : dayjs(watch("end")).format("DD/MM/YYYY")}
            </StyledText>
          </StyledView>
          <StyledView style={{ flex: 0.5 }}>
            <StyledTouchableOpacity intent="secondary" onPress={() => setShowEndDatePicker(true)}>
              <StyledText className="text-purple-primary text-center">ตั้งวันสิ้นสุด</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          {showEndDatePicker && (
            <Controller
              control={control}
              name="end"
              render={({ field: { onChange, value } }) => {
                return (
                  <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={(e, selectedDate) => {
                      if (selectedDate) {
                        onChange(new Date(e.nativeEvent.timestamp as number).toISOString());
                      }
                      setShowEndDatePicker(false);
                    }}
                  />
                );
              }}
            />
          )}
        </StyledView>
        {errors.end && <StyledText className="text-red-500 text-xs mt-2">{errors.end?.message}</StyledText>}
      </StyledView>

      <StyledView className="pt-6">
        <StyledText className="text-lg color-purple-primary font-noto-semibold">ประเภท</StyledText>
        <Controller
          control={control}
          name="categories"
          render={({ field: { onChange, value } }) => (
            <Chip
              chips={categories_chip}
              selectedChips={categoriesSelected}
              onSelectedChipsChange={(newSelectedChips) => {
                onChange(newSelectedChips);
                handleCategoriesSelected(newSelectedChips);
              }}
            />
          )}
        />
        {errors.categories && (
          <StyledText className="text-red-500 text-xs mt-2">{errors.categories?.message}</StyledText>
        )}
      </StyledView>

      <StyledView className="pt-6">
        <StyledText className="text-lg color-purple-primary font-noto-semibold">สำหรับชั้นปี</StyledText>
        <Controller
          control={control}
          name="studentAccessYears"
          render={({ field: { onChange, value } }) => (
            <Chip
              chips={studentyears_chip}
              selectedChips={studentYearsSelected}
              onSelectedChipsChange={(newSelectedChips) => {
                onChange(newSelectedChips);
                handleStudentYearsSelected(newSelectedChips);
              }}
            />
          )}
        />
        {errors.studentAccessYears && (
          <StyledText className="text-red-500 text-xs mt-2">{errors.studentAccessYears?.message}</StyledText>
        )}
      </StyledView>

      <StyledTouchableOpacity
        onPress={handleSubmit(onSubmit)}
        hasIcon={true}
        intent="primary"
        size="medium"
        className="flex-row justify-center items-center my-6 space-x-2"
      >
        <MaterialCommunityIcons name="plus-circle" size={20} color="white" />
        <StyledText className="text-white text-lg font-noto-semibold">สร้าง</StyledText>
      </StyledTouchableOpacity>
    </ScrollView>
  );
};

const WrappedAddEvent = () => {
  return (
    <AddEventFormProvider>
      <AddEvent />
    </AddEventFormProvider>
  );
};

export default WrappedAddEvent;
