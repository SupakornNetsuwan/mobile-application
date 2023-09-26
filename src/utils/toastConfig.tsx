import Toast, { BaseToast, ErrorToast, type ToastConfig, BaseToastProps } from "react-native-toast-message";
import { StyledView, StyledText } from "../core/components/styled";

const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 18,
      }}
      contentContainerStyle={{ backgroundColor: "white" }}
      text2Style={{
        fontSize: 12,
        fontFamily: "noto",
      }}
    />
  ),
};

export default toastConfig;
