import React, { useState } from "react";
import AuthContext, { type SessionType } from "../contexts/AuthContext";
import useSignIn from "../hooks/useSignIn";
import useSignOut from "../hooks/useSignOut";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mutate } = useSignIn();
  const signOut = useSignOut();
  const [session, setSession] = useState<SessionType>(null);

  const signIn = (identifier: string, password: string) => {
    mutate(
      {
        identifier: identifier,
        password: password,
      },
      {
        onSuccess(data, variables, context) {
          const { jwt, user } = data.data;
          console.log({ jwt, user });

          setSession({
            jwt,
            user,
          });
        },
        onError(error, variables, context) {
          console.log(error.response?.data.error.message);
        },
      }
    );
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
