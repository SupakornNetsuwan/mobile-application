import { useEffect, useMemo } from "react";
import { StyledView, StyledText } from "./styled";

const CustomFallback: React.FC<{
  error: Error;
  resetError: () => void;
}> = ({ error, resetError }) => {
  const message = useMemo(() => {
    if (error instanceof Error) {
      return error.message;
    }
    return error;
  }, [error]);

  return (
    <StyledView className="h-screen bg-gray-50 items-center justify-center">
      <StyledText className="text-red-500 text-lg font-noto-bold">มีข้อผิดพลาดเกิดขึ้น</StyledText>
      <StyledView className="w-1/2 h-px bg-gray-500 my-4" />
      <StyledText className="text-gray-800">{message}</StyledText>
    </StyledView>
  );
};

export default CustomFallback;
