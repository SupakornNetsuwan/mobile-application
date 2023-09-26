import React from "react";
import useAuthen from "../../core/hooks/useAuthen";
import { useFormContext, Controller, SubmitHandler } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyledText,
  StyledView,
  StyledTextInput,
  StyledImage,
  StyledTouchableOpacity,
} from "../../core/components/styled";
import { ImageBackground } from "react-native";
import type { SignInFormType } from "./providers/SignInProvider";

const Page = () => {
  const { handleSubmit, control } = useFormContext<SignInFormType>();
  const { signIn } = useAuthen();

  const onSubmit: SubmitHandler<SignInFormType> = (data) => {
    signIn(data.identifier, data.password)
  };

  return (
    <ImageBackground
      source={require("../../../assets/signin-bg.png")}
      className="w-full h-screen items-center justify-start pt-24"
    >
      <StyledView className="space-y-8 w-full px-12">
        <StyledImage source={require("../../../assets/signin-logo.png")} className="self-center scale-[0.35]" />
        <StyledView className="">
          <Controller
            name="identifier"
            render={({ field: { onChange, value, ref, onBlur, name } }) => {
              return (
                <StyledView className="relative">
                  <StyledTextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    inputMode="email"
                    placeholder="อีเมล"
                    hasIcon={true}
                    icon={
                      <MaterialCommunityIcons
                        name="magnify"
                        size={24}
                        color="rgb(107,114,128)"
                        style={{ position: "absolute", top: "50%", left: 10, transform: [{ translateY: -12 }] }}
                      />
                    }
                  />
                </StyledView>
              );
            }}
            control={control}
          />
          <StyledView className="mt-2 mb-4">
            <Controller
              name="password"
              render={({ field: { onChange, value, ref, onBlur, name } }) => {
                return (
                  <StyledView className="relative">
                    <StyledTextInput
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                      placeholder="รหัสผ่าน"
                      textContentType="password"
                      secureTextEntry={true}
                      hasIcon={true}
                      icon={
                        <MaterialCommunityIcons
                          name="form-textbox-password"
                          size={24}
                          color="rgb(107,114,128)"
                          style={{ position: "absolute", top: "50%", left: 10, transform: [{ translateY: -12 }] }}
                        />
                      }
                    />
                  </StyledView>
                );
              }}
              control={control}
            />
          </StyledView>
          <StyledTouchableOpacity
            onPress={handleSubmit(onSubmit)}
            intent="primary"
            size="medium"
            className="items-center"
          >
            <StyledText className="text-lg font-noto-semibold text-white">Sign in</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </ImageBackground>
  );
};
export default Page;
