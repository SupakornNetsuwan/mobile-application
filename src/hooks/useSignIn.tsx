import { useMutation } from "@tanstack/react-query";
import type { MutationOptions } from "@tanstack/react-query";
import axios from "../utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { ResponseErrorType } from "../types/app";

type SignInResponseType = {
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
    role?: {
      id: number;
      name: string;
      description: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

const useSignIn = (
  options?: MutationOptions<
    AxiosResponse<SignInResponseType>,
    AxiosError<ResponseErrorType>,
    { identifier: string; password: string }
  >
) => {
  return useMutation({
    mutationFn: async (payload) => {
      return axios.post("/custom-authen", {
        identifier: payload.identifier,
        password: payload.password,
      });
    },
    ...options,
  });
};

export default useSignIn;
