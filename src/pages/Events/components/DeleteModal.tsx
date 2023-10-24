import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { StyledText, StyledView, StyledTouchableOpacity } from '../../../core/components/styled';
import useAuthen from '../../../core/hooks/useAuthen';
import { Event } from '../../../core/hooks/Events/useGetEvents';
import LoadingActivityindicator from '../../../core/components/LoadingActivityindicator';
import { useNavigation, type NavigationProp } from "@react-navigation/core";
import { EventsStackRouterType } from '../routers/EventsStackRouter';
import useDeleteEvent from '../../../core/hooks/Events/useDeleteEvent';
import Toast from "react-native-toast-message";
import { useQueryClient } from '@tanstack/react-query';

const DeleteModal: React.FC<{ openingDeleteEventModal: boolean, setOpeningDeleteEventModal?: (newType: boolean) => void, event?: Event }> = ({ openingDeleteEventModal, setOpeningDeleteEventModal, event }) => {
    const auth = useAuthen();

    if (auth.status == "loading")
        return (<LoadingActivityindicator />);

    if (auth.status == "unauthenticated")
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    // ref
    const deleteEventModalRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if ((openingDeleteEventModal) && deleteEventModalRef.current) {
            deleteEventModalRef.current?.present()
        }
    }, [openingDeleteEventModal]);


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
                    navigation.navigate("Events")
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
                                        onPress={() => { deleteEventModalRef.current?.close; setOpeningDeleteEventModal?.(false) }}
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

export default DeleteModal;