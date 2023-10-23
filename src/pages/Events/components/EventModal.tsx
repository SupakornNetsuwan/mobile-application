import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { StyledText, StyledView, StyledTouchableOpacity } from '../../../core/components/styled';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuthen from '../../../core/hooks/useAuthen';
import { Event } from '../../../core/hooks/Events/useGetEvents';
import LoadingActivityindicator from '../../../core/components/LoadingActivityindicator';
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { EventsStackRouterType } from '../routers/EventsStackRouter';
import useDeleteEvent from '../../../core/hooks/Events/useDeleteEvent';
import Toast from "react-native-toast-message";
import { useQueryClient } from '@tanstack/react-query';

const EventModal: React.FC<{ openingEventModal: boolean, setOpeningEventModal?: (newType: boolean) => void, event?: Event }> = ({ openingEventModal, setOpeningEventModal, event }) => {
    const auth = useAuthen();

    if (auth.status == "loading")
        return (<LoadingActivityindicator />);

    if (auth.status == "unauthenticated")
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    // ref
    const eventModalRef = useRef<BottomSheetModal>(null);
    const deleteEventModalRef = useRef<BottomSheetModal>(null);
    const [openingDeleteEventModal, setOpeningDeleteEventModal] = useState<boolean>(false);

    useEffect(() => {
        if ((openingEventModal) && eventModalRef.current) {
            eventModalRef.current.present();
        }
        if ((openingDeleteEventModal) && deleteEventModalRef.current) {
            deleteEventModalRef.current?.present()
        }
    }, [openingEventModal, openingDeleteEventModal]);

    const handleEventModalChange = useCallback((index: number) => {
        if (index < 0) {
            eventModalRef.current?.close();
            setOpeningEventModal?.(false);
        }
    }, []);

    const handleDeleteEventModalChange = useCallback((index: number) => {
        if (index < 0) {
            deleteEventModalRef.current?.close();
            setOpeningDeleteEventModal?.(false);
        }
    }, []);

    const renderBackdrop = useCallback(
        // @ts-ignore
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const navigation = useNavigation<NavigationProp<EventsStackRouterType>>()

    const handleEditEvent = (eventId?: number) => {
        eventModalRef.current?.close();
        setOpeningEventModal?.(false);
        navigation.navigate("EditEvent", { eventId: eventId });
    }

    const handleDeleteEvent = () => {
        setOpeningEventModal?.(false);
        setOpeningDeleteEventModal?.(true);
    }

    const deleteEvent = useDeleteEvent();
    const queryClient = useQueryClient();

    const handleConfirmDelete = (eventId?: number) => {
        deleteEvent?.mutate(
            { eventId: eventId },
            {
                onSuccess() {
                    Toast.show({ text1: "ลบกิจกรรมสำเร็จ 🗑️" });
                    queryClient.invalidateQueries(["getEvents"]);
                    deleteEventModalRef.current?.close();
                    setOpeningDeleteEventModal?.(false);
                },
                onError(error, variables, context) {
                    console.log(error.response?.data);
                },
            }
        );
    }

    // renders
    return (
        <BottomSheetModalProvider>
            {openingEventModal && (
                <StyledView>
                    <BottomSheetModal
                        ref={eventModalRef}
                        enableDynamicSizing={true}
                        backdropComponent={renderBackdrop}
                        enableHandlePanningGesture
                        onChange={handleEventModalChange}
                    >
                        <BottomSheetView>
                            <StyledView className='m-5 p-2 rounded-xl bg-gray-100'>
                                <TouchableOpacity className='bg-gray-100 items-center flex-row space-x-2 py-2'>
                                    <MaterialCommunityIcons name="share" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                    <StyledText className='text-lg font-noto-semibold text-purple-primary'>แชร์</StyledText>
                                </TouchableOpacity>

                                {event?.attributes.owner.data.id == auth.session.user.id && (
                                    <StyledView>
                                        <TouchableOpacity onPress={() => handleEditEvent(event.id)} className='bg-gray-100 items-center flex-row space-x-2 py-2'>
                                            <MaterialCommunityIcons name="cog" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                            <StyledText className='text-lg font-noto-semibold text-purple-primary'>แก้ไขกิจกรรม</StyledText>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={handleDeleteEvent} className='bg-gray-100 items-center flex-row space-x-2 py-2'>
                                            <MaterialCommunityIcons name="trash-can" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                            <StyledText className='text-lg font-noto-semibold text-purple-primary'>ลบกิจกรรม</StyledText>
                                        </TouchableOpacity>
                                    </StyledView>
                                )}
                            </StyledView>
                        </BottomSheetView>
                    </BottomSheetModal>
                </StyledView>
            )}
            {
                openingDeleteEventModal && (
                    <StyledView>
                        <BottomSheetModal
                            ref={deleteEventModalRef}
                            enableDynamicSizing={true}
                            backdropComponent={renderBackdrop}
                            enableHandlePanningGesture
                            onChange={handleDeleteEventModalChange}
                        >
                            <BottomSheetView>
                                <StyledView className='rounded-xl justify-center items-center py-10'>
                                    <StyledText className='text-2xl font-noto-bold text-center'>ยืนยันที่จะลบหรือไม่</StyledText>
                                    <StyledText className="px-12 text-center text-base text-red-500">เมื่อคุณลบกิจกรรมนี้แล้ว จะไม่มีทางกลับมาได้อีก กรุณาตรวจสอบก่อนที่จะดำเนินการลบ 🗑️</StyledText>

                                    <StyledTouchableOpacity
                                        onPress={() => handleConfirmDelete(event?.id)}
                                        intent="primary"
                                        size="medium"
                                        className="flex-row justify-center items-center space-x-2 mt-6 w-80"
                                    >
                                        <StyledText className="text-white text-lg font-noto-semibold">ยืนยัน</StyledText>
                                    </StyledTouchableOpacity>

                                    <StyledTouchableOpacity
                                        intent="plain"
                                        size="medium"
                                        className="flex-row justify-center items-center space-x-2 mt-2 w-80"
                                        onPress={() => { deleteEventModalRef.current?.close; setOpeningDeleteEventModal(false) }}
                                    >
                                        <StyledText className="text-lg text-purple-primary">ยกเลิก</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </StyledView>
                )
            }
        </BottomSheetModalProvider>
    )
}

export default EventModal