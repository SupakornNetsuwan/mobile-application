import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { StyledText, StyledView, StyledTouchableOpacity } from '../../../core/components/styled';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from 'react-native';

const Modal: React.FC<{ openingModal: boolean, onOpeningModal?: (newType: boolean) => void, isOwner?: boolean }> = ({ openingModal, onOpeningModal, isOwner }) => {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => {
        if (isOwner && Platform.OS == "ios") {
            return ['29%', '29%'];
        }
        else if (isOwner && Platform.OS == "android") {
            return ['26.5%', '26.5%'];
        }
        else if (!isOwner && Platform.OS == "ios") {
            return ['14%', '14%'];
        }
        else if (!isOwner && Platform.OS == "android") {
            return ['13%', '13%'];
        }
    }, [isOwner]);

    bottomSheetModalRef.current?.present();

    useEffect(() => {
        if (openingModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, [openingModal]);

    const handleSheetChange = useCallback((index: number) => {
        if (index <= 0) {
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
                        onChange={handleSheetChange}
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        backdropComponent={renderBackdrop}
                    >
                        {isOwner ? (
                            <StyledView className='px-5'>
                                <StyledTouchableOpacity intent="plain" className='py-3 bg-white space-x-2 items-center rounded-none rounded-t-lg border-b border-gray-200' hasIcon={true}>
                                    <MaterialCommunityIcons name="share" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                    <StyledText className='font-noto-semibold text-purple-primary text-lg'>แชร์</StyledText>
                                </StyledTouchableOpacity>

                                <StyledTouchableOpacity intent="plain" className='py-3 bg-white space-x-2 items-center rounded-none border-b border-gray-200' hasIcon={true}>
                                    <MaterialCommunityIcons name="pencil" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                    <StyledText className='font-noto-semibold text-purple-primary text-lg'>แก้ไขกิจกรรม</StyledText>
                                </StyledTouchableOpacity>

                                <StyledTouchableOpacity intent="plain" className='py-3 bg-white space-x-2 items-center rounded-none rounded-b-lg' hasIcon={true}>
                                    <MaterialCommunityIcons name="trash-can" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                    <StyledText className='font-noto-semibold text-purple-primary text-lg'>ลบกิจกรรม</StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                        ) :
                            (
                                <StyledView className='px-5'>
                                    <StyledTouchableOpacity intent="plain" className='py-3 bg-white space-x-2 items-center rounded-lg' hasIcon={true}>
                                        <MaterialCommunityIcons name="share" size={24} color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
                                        <StyledText className='font-noto-semibold text-purple-primary text-lg'>แชร์</StyledText>
                                    </StyledTouchableOpacity>
                                </StyledView>
                            )}
                    </BottomSheetModal>
                </StyledView>
            )}
        </BottomSheetModalProvider>
    )
}

export default Modal