import React, { useState, useEffect } from "react";
import AuthContext, { type SessionType } from "../contexts/AuthContext";
import useSignIn, { type SignInResponseType } from "../hooks/useSignIn";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ทำหน้าที่ดึงข้อมูลจาก local storage
const getSessionFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user-session");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    // 🔴
    console.log(error);
  }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mutate } = useSignIn();

  const [session, setSession] = useState<SessionType>("loading");

  // ทำหน้าที่เก็บ set state จาก local storage
  const setSessionFromStorage = async () => {
    const sessionFromStorage: SignInResponseType | null = await getSessionFromStorage();
    setSession(sessionFromStorage ? { jwt: sessionFromStorage.jwt, user: sessionFromStorage.user } : null);
  };

  useEffect(() => {
    setSessionFromStorage();
  }, []);

  const signIn = (identifier: string, password: string) => {
    mutate(
      {
        identifier: identifier,
        password: password,
      },
      {
        onSuccess: async (data, variables, context) => {
          const { jwt, user } = data.data;

          try {
            await AsyncStorage.setItem("user-session", JSON.stringify({ jwt, user }));
          } catch (error) {
            // 🔴
            console.log(error);
          }

          Toast.show({
            type: "success",
            text1: "เข้าสู่ระบบสำเร็จ",
            text2: "ยินดีต้อนรับ",
          });

          setSession({
            jwt,
            user,
          });
        },
        onError: (error, variables, context) => {
          Toast.show({
            type: "error",
            text1: "ไม่สามารถเข้าสู่ระบบ",
            text2: error.response?.data.error.message,
          });
        },
      }
    );
  };

  const signOut = () => {
    setSession(null);
    AsyncStorage.removeItem("user-session");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
