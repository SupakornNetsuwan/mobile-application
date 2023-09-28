import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";

export interface GetProfileResponseType {
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
  picture: {
    id: number;
    name: string;
    alternativeText?: null;
    caption?: null;
    width: number;
    height: number;
    formats: {
      thumbnail: ThumbnailOrSmall;
      small: ThumbnailOrSmall;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: null;
    provider: string;
    provider_metadata?: null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ThumbnailOrSmall {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

const useGetProfile = (userId: string) => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated") return null;

  return useQuery<AxiosResponse<GetProfileResponseType>, AxiosError<ResponseErrorType>>({
    queryFn: async () => {
      return axios.get(`/users/${userId}?populate=picture`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    queryKey: ["getProfile", userId],
  });
};

export default useGetProfile;
