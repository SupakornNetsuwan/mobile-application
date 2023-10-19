import React, { useState, useMemo } from "react";
import {
  StyledTouchableOpacity,
  StyledText,
  StyledView,
} from "../../../core/components/styled";
import useGetStaffActivity from "../../../core/hooks/Staff/useGetStaffActivity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAddStaffActivity from "../../../core/hooks/Staff/useAddStaffActivity";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteStaffActivity from "../../../core/hooks/Staff/useDeleteStaffActivity";

const JoinButton: React.FC<{ eventName: string; eventId: number }> = ({
  eventName,
  eventId,
}) => {
  const { data, isLoading, error } = useGetStaffActivity(eventId)!;
  const activity = useMemo(() => data?.data.data, [data?.data.data])!;

  const joined = activity?.length > 0;
  const intent = joined ? "primary" : "plain";
  const textClass = joined ? "text-white" : "text-purple-primary";
  const buttonText = joined ? "กำลังเข้าร่วม" : "เข้าร่วม";

  const queryClient = useQueryClient();
  const addStaff = useAddStaffActivity();
  const deleteStaff = useDeleteStaffActivity();

  const handleJoin = () => {
    if (joined) {
      deleteStaff?.mutate(
        { staffId: activity[0]?.id },
        {
          
          onSuccess() {
            queryClient.invalidateQueries(["getEvents"])
            Toast.show({ text1: `ออกจากกิจกรรม ${eventName} แล้ว 😿` });
            queryClient.invalidateQueries(["getStaffActivities", eventId]);
          },
        }
      );
    } else {
      addStaff?.mutate(
        { eventId: eventId },
        {
          onSuccess() {
            queryClient.invalidateQueries(["getEvents"])
            Toast.show({ text1: `เข้าร่วมกิจกรรม ${eventName} แล้ว ✨` });
            queryClient.invalidateQueries(["getStaffActivities", eventId]);
          },
        }
      );
    }
  };

  if (error) throw error;
  if (isLoading)
    return (
      <StyledView>
        <StyledText>Loading...</StyledText>
      </StyledView>
    );

  return (
    <StyledTouchableOpacity
      className="mb-1 flex-row items-center space-x-1"
      size="small"
      intent={intent}
      onPress={handleJoin}
    >
      {joined && (
        <MaterialCommunityIcons name="check" size={18} color="white" />
      )}
      <StyledText className={`font-noto-semibold ${textClass}`}>
        {buttonText}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default JoinButton;
