import React from "react";

export type SessionType = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type AuthFeature = {
  signIn: (identifier: string, password: string) => void;
  signOut: () => void;
};

export type AuthType = AuthFeature &
  (
    | {
        status: "loading";
      }
    | {
        status: "unauthenticated";
      }
    | {
        status: "authenticated";
        session: SessionType;
      }
  );

const AuthContext = React.createContext<null | AuthType>(null);

export default AuthContext;
