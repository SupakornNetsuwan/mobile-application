import React from "react";

export type SessionType =
  | {
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
    }
  | "loading"
  | null
  | undefined;

export type AuthType = {
  signIn: (identifier: string, password: string) => void;
  signOut: () => void;
  session: SessionType;
};

const AuthContext = React.createContext<null | AuthType>(null);

export default AuthContext;
