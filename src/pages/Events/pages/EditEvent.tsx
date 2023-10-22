import AddEventFormProvider from "../providers/AddEventFormProvider";
import { AddEvent } from "./AddEvent";
import { ManageStackRouterType } from "../../Event/routers/ManageStackRouter";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import EditEventFromProvider from "../providers/EditEventFormProvider";
import { StyledText, StyledView, StyledTouchableOpacity, StyledTextInput } from "../../../core/components/styled";
import useGetEvent from "../../../core/hooks/useGetEvent";
import { useMemo, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { EventSchemaType } from "../providers/AddEventFormProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UploadEventCover from "../components/UploadEventCover";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import Chip from "../components/Chip";
import useGetCategories from "../../../core/hooks/Events/Category/useGetCategories";
import useGetStudentYears from "../../../core/hooks/Events/StudentYear/useGetStudentYear";
import useUpdateEvent from "../../../core/hooks/Events/useUpdateEvent";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import useAuthen from "../../../core/hooks/useAuthen";

type EditStaffProps = {
    route: RouteProp<ManageStackRouterType, 'EditEvent'>
    navigation: StackNavigationProp<ManageStackRouterType, 'ManageEvent'>
}

const EditEvent: React.FC<{ eventId?: number }> = ({ eventId }) => {
    const auth = useAuthen();

    if (auth.status == "loading")
      return (
        <StyledView>
          <StyledText>Loading...</StyledText>
        </StyledView>
      );
  
    if (auth.status == "unauthenticated")
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    const { data, isLoading, isError } = useGetEvent(eventId)!
    const event = useMemo(() => data?.data.data, [data?.data.data])!;

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const {
        control,
        formState: { errors },
        watch,
        handleSubmit,
    } = useFormContext<EventSchemaType>();

    const initialCategories = event?.attributes.categories.data.map(category => category.id) || [];
    const initialStudentYears = event?.attributes.studentAccessYears.data.map(year => year.id) || [];

    const [categoriesSelected, setCategoriesSelected] = useState(initialCategories);
    const [studentYearsSelected, setStudentYearsSelected] = useState(initialStudentYears);

    useEffect(() => {
        const newCategories = event?.attributes.categories.data.map(category => category.id) || [];
        const newStudentYears = event?.attributes.studentAccessYears.data.map(year => year.id) || [];

        setCategoriesSelected(newCategories);
        setStudentYearsSelected(newStudentYears);
    }, [event]);

    const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetCategories()!;
    const allCategories = useMemo(() => categoriesData?.data.data, [categoriesData?.data.data])!;

    const { data: studentYearsData, isLoading: studentYearsLoading, error: studentYearsError } = useGetStudentYears()!;
    const allStudentYears = useMemo(() => studentYearsData?.data.data, [studentYearsData?.data.data])!;

    const categories_chip = {
        icon: "tag-outline",
        items: allCategories,
    };

    const studentyears_chip = {
        icon: "school-outline",
        items: allStudentYears,
    };

    const handleCategoriesSelected = (newSelectedChips: number[]) => {
        setCategoriesSelected(newSelectedChips);
    };

    const handleStudentYearsSelected = (newSelectedChips: number[]) => {
        setStudentYearsSelected(newSelectedChips);
    };

    const queryClient = useQueryClient();
    const editEvent = useUpdateEvent(eventId)!;
    const navigation = useNavigation();

    if (isError) {
        throw isError
    }
    if (isLoading || categoriesLoading || studentYearsLoading) {
        return <StyledText>Loading...</StyledText>
    }

    const onSubmit: SubmitHandler<EventSchemaType> = (data) => {
        if (!data.cover) delete data.cover;

        editEvent.mutate(data, {
            onSuccess(data, variables, context) {
              Toast.show({ text1: "แก้ไขกิจกรรมสำเร็จ" });
              queryClient.invalidateQueries(["getEvents"])
              queryClient.invalidateQueries(["getEvent", eventId])
              queryClient.invalidateQueries(["getPostsFromEventsJoined"])
              navigation.goBack()
            },
            onError(error, variables, context) {
              console.log(error.response?.data.error);
            },
          });
    };

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
                                    spellCheck={false}
                                    autoCorrect={false}
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
                                    spellCheck={false}
                                    autoCorrect={false}
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
                    <UploadEventCover eventId={eventId} />
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
                {categoriesSelected && (
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
                )}
                {errors.categories && (
                    <StyledText className="text-red-500 text-xs mt-2">{errors.categories?.message}</StyledText>
                )}
            </StyledView>

            <StyledView className="pt-6">
                <StyledText className="text-lg color-purple-primary font-noto-semibold">สำหรับชั้นปี</StyledText>
                {
                    studentYearsSelected && (
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
                    )
                }
                {errors.studentAccessYears && (
                    <StyledText className="text-red-500 text-xs mt-2">{errors.studentAccessYears?.message}</StyledText>
                )}
            </StyledView>

            <StyledTouchableOpacity
                onPress={handleSubmit(onSubmit)}
                intent="primary"
                size="medium"
                className="flex-row justify-center items-center my-6 space-x-2"
            >
                <StyledText className="text-white text-lg font-noto-semibold">แก้ไข</StyledText>
            </StyledTouchableOpacity>
        </ScrollView>
    )
}

const WrappedEditEvent = ({ route, navigation }: EditStaffProps) => {
    return (
        <EditEventFromProvider eventId={route.params.eventId}>
            <EditEvent eventId={route.params.eventId} />
        </EditEventFromProvider>
    );
};

export default WrappedEditEvent;