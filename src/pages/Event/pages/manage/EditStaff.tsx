
import { StyledView, StyledText, StyledImage, StyledTextInput } from "../../../../core/components/styled"
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
const EditStaff = () =>{

    // const {
    //     control,
    //     formState: { errors },
    //     watch,
    //     handleSubmit,
    //   } = useFormContext();

    return(
        <ScrollView>
            <StyledView className="bg-white h-full"> 
                <StyledImage source={require("../../../../../assets/profile-backdrop.png")} className="w-full h-22" />
                <StyledView className="mt-2 ml-4 mr-4 mb-2">
                    <StyledText className="text-3xl  text-purple-primary font-bold mb-1">ITCAMP19</StyledText>
                <StyledText className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</StyledText>
                </StyledView>
                <StyledView className="bg-gray-100 p-5 ">
                    <StyledView className="items-center">
                        <StyledImage
                                source={{ uri:"https://cdn.discordapp.com/attachments/1019966926014910516/1149367750121242764/IMG_1576.png?ex=65314d21&is=651ed821&hm=3ee19ac28f5d7bd361ea5b1575cc94584a4a13a905ca09402ae17b2cee5c4c35&"}}
                                className="h-16 aspect-square rounded-full mb-2"
                                style={{ borderColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, borderWidth: 2 }}
                            />
                        <StyledView className="ml-2 items-center gap-2">
                            <StyledText className="text-xl font-bold ">นายปันจ์ วะชังเงิน</StyledText>
                            <StyledText className="text-sm  text-gray-500 ">64070228</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledView className="p-2 gap-1">
                    <StyledView className="flex flex-row items-center p-1">
                        <MaterialCommunityIcons name="hail" size={36}></MaterialCommunityIcons>
                        <StyledView className="w-full">
                            <StyledText className="text-sm text-gray-500 pl-4">หน้าที่</StyledText>
                            <StyledTextInput
                                // onChangeText={onChange}
                                // value={value}
                                // ref={ref}
                                className="border-b border-gray-300"
                                placeholder="ผู้ช่วย / เลขาธิการ / อื่นๆ"
                            />
                        </StyledView>
                    </StyledView>
                    <StyledView className="flex flex-row items-center">
                        <MaterialCommunityIcons name="clipboard-account-outline" size={36}></MaterialCommunityIcons>
                        <StyledView className="w-full">
                            <StyledText className="text-sm text-gray-500 pl-4">ระดับ</StyledText>
                            <StyledTextInput
                                // onChangeText={onChange}
                                // value={value}
                                // ref={ref}
                                className="border-b border-gray-300"
                                placeholder="ประธานค่าย"
                            />
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledView>
        </ScrollView>
    )
}

export default EditStaff