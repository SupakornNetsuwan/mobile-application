import { StyledView, StyledImage, StyledTextInput, StyledTouchableOpacity, StyledText } from "../../../core/components/styled";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const CreatePost = () =>{
    return (
        <>
            <ScrollView >
               <StyledView className="bg-white">
                        <StyledView className="bg-2 pl-4 mb-4">
                            <StyledText className="text-lg">รายละเอียดของโพสต์</StyledText>
                        </StyledView>
                        <StyledView className="w-full">
                                <StyledText className="text-sm text-gray-500 pl-4">หัวข้อ</StyledText>
                                <StyledTextInput
                                    // onChangeText={onChange}
                                    // value={value}
                                    // ref={ref}
                                    className="border-b border-gray-300"
                                    placeholder="กรุณาเพิ่มหัวข้อ"
                                />
                        </StyledView>
                     <StyledView className="mt-5">
                        <StyledTextInput
                                        // onChangeText={onChange}
                                        // value={value}
                                        // ref={ref}
                                        textAlignVertical="top"
                                        multiline={true}
                                        placeholder="กรุณากรอกข้อความ"
                                    />
                     </StyledView>
                </StyledView>
            </ScrollView>
        </>
    )
}
export default CreatePost