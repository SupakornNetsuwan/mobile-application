import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";

type GetStaffResponseType = {
    data:{
        id:number,
        attributes:{
            position:string,
            duty:string
        }
    }
}

const useGetStaff = (userId:string)=>{
    const auth = useAuthen();

    // console.log(auth.status, "👌");
  
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
  
    return useQuery<AxiosResponse<GetStaffResponseType>, AxiosError<ResponseErrorType>>({
        queryFn: async () => {
          return axios.get(`/staff/${userId}`, {
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
        },
        queryKey: ["getStaff", userId],
      });
}

export default useGetStaff