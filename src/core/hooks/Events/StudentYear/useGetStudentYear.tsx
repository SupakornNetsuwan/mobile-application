import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../../types/app";
import useAuthen from "../../useAuthen";

export interface StudentYear {
  id: number;
  attributes: {
    name: string,
    year: number
  };
}

export interface StudentYears {
  data?: StudentYear[];
}

const useGetStudentYears = () => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useQuery<AxiosResponse<StudentYears>, AxiosError<ResponseErrorType>>({
    queryFn: async () => {
      return axios.get(`/student-years`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    staleTime: 0,
    queryKey: ["getStudentYears"],
  });
};
export default useGetStudentYears;
