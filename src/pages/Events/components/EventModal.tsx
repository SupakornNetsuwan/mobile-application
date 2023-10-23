import React, { useEffect, useMemo, useRef, useCallback } from 'react';
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

const Modal: React.FC<{ openingModal: boolean, onOpeningModal?: (newType: boolean) => void, event?: Event }> = ({ openingModal, onOpeningModal, event }) => {
    const auth = useAuthen();

    if (auth.status == "loading")
        return (
            <StyledView>
                <StyledText>Loading...</StyledText>
            </StyledView>
        );

    if (auth.status == "unauthenticated")
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (openingModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, [openingModal]);

    const handleSheetChange = useCallback((index: number) => {
        if (index < 0) {
            bottomSheetModalRef.current?.close();
            onOpeningModal?.(false)
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

    // renders
    return (
        <BottomSheetModalProvider>
            {openingModal && (
                <StyledView>
                    <BottomSheetModal
                        backgroundStyle={{ backgroundColor: "#f3f4f6" }}
                        ref={bottomSheetModalRef}
                        enableDynamicSizing={true}
                        backdropComponent={renderBackdrop}
                        enableHandlePanningGesture
                        onChange={handleSheetChange}
                    >
                        <BottomSheetView>
                            <StyledView className='m-5 p-2 rounded-xl bg-white'>
                                <TouchableOpacity className='bg-white items-center flex-row space-x-2 py-2'>
                                    <MaterialCommunityIcons name="share" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                    <StyledText className='text-lg font-noto-semibold text-purple-primary'>แชร์</StyledText>
                                </TouchableOpacity>

                                {event?.attributes.owner.data.id == auth.session.user.id && (
                                    <StyledView>
                                        <TouchableOpacity className='bg-white items-center flex-row space-x-2 py-2'>
                                            <MaterialCommunityIcons name="cog" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                            <StyledText className='text-lg font-noto-semibold text-purple-primary'>แก้ไขกิจกรรม</StyledText>
                                        </TouchableOpacity>

                                        <TouchableOpacity className='bg-white items-center flex-row space-x-2 py-2'>
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
        </BottomSheetModalProvider>
    )
}

export default Modal