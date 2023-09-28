import React from "react";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { AxiosResponse, AxiosError } from "axios";
import { EditProfileSchemaType } from "../../pages/Account/providers/EditProfileFormProvider";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";

export type UpdateProfileResponseType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  birthdate: string;
};

const useUpdateProfile = (
  userId: string,
  options?: MutationOptions<
    AxiosResponse<UpdateProfileResponseType>,
    AxiosError<ResponseErrorType>,
    EditProfileSchemaType
  >
) => {
  const { session } = useAuthen();

  if (session === "loading" || !session) return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.put(
        `/users/${userId}`,
        {
          username: payload.firstname + " " + payload.lastname,
          birthdate: new Date(payload.birthdate).toISOString(),
          picture: payload.pictureId,
          address: payload.address,
        },
        {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        }
      );
    },
    ...options,
  });
};

export default useUpdateProfile;
