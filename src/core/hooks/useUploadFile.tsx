import React from "react";
import { useMutation, type MutateOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../utils/axios";
import type { ResponseErrorType } from "../../types/app";

export type UploadFileType = FormData;

type ThumbnailOrMediumOrLargeOrSmall = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type UploadFileResponseType = {
  id: number;
  name: string;
  alternativeText?: null;
  caption?: null;
  width: number;
  height: number;
  formats: {
    thumbnail: ThumbnailOrMediumOrLargeOrSmall;
    medium: ThumbnailOrMediumOrLargeOrSmall;
    large: ThumbnailOrMediumOrLargeOrSmall;
    small: ThumbnailOrMediumOrLargeOrSmall;
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
}[];

const useUploadFile = (
  options?: MutateOptions<AxiosResponse<UploadFileResponseType>, AxiosError<ResponseErrorType>, UploadFileType>
) => {
  return useMutation({
    ...options,
    mutationFn: async (payload) => {
      return axios.post("/upload", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};

export default useUploadFile;
