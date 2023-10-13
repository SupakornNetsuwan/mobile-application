import { StyleSheet, View } from "react-native"
import { StyledView } from "../../../core/components/styled";

const Line = () => {
    return (
        <View style={styles.lineStyle} />
    )
}

const styles = StyleSheet.create({
    lineStyle: {
        borderWidth: 0.3,
        opacity: 0.45,
        borderColor: '#757575',
    }
});

export default Line