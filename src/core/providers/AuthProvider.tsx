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

  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [session, setSession] = useState<SessionType>({
    jwt: "",
    user: {
      blocked: false,
      confirmed: true,
      createdAt: "",
      email: "",
      id: 0,
      provider: "",
      updatedAt: "",
      username: "",
    },
  });

  // ทำหน้าที่เก็บ set state จาก local storage
  const setSessionFromStorage = async () => {
    const sessionFromStorage: SignInResponseType | null = await getSessionFromStorage();
    if (sessionFromStorage) {
      setStatus("authenticated");
      setSession({ jwt: sessionFromStorage.jwt, user: sessionFromStorage.user });
      return;
    }
    // ถ้าไม่มี ก็คือยังไม่ได้เข้าสู่ระบบ
    setStatus("unauthenticated");
  };

  useEffect(() => {
    setStatus("loading");
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

          setStatus("authenticated");
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
    setStatus("unauthenticated");
    AsyncStorage.removeItem("user-session");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
