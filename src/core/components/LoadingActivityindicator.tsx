import { ActivityIndicator } from "react-native";
import { StyledView } from "./styled";

const LoadingActivityindicator = () => {
    return (
        <StyledView style={{ flex: 1 }} className="items-center justify-center">
            <ActivityIndicator size="large" color={process.env.EXPO_PUBLIC_PRIMARY_COLOR} />
        </StyledView>
    )
}

export default LoadingActivityindicator