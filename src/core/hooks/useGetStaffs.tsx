import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";
export type GetStaffResponseType = {
    data:StaffType[]
}
export type StaffType = {
    id: number,
    attributes:{
        position: string,
        duty:string,
        staff:{
            data:{
                id:string,
                attributes:{
                    username:string,
                    email:string
                    picture:{
                        data:{
                            attributes:{
                                url:string
                            }

                        }
                    }
                }
            }
        }
    }
}

const useGetStaffs = (eventId:string) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
    return useQuery<AxiosResponse<GetStaffResponseType>, AxiosError<GetStaffResponseType>>({
        queryFn: async () => {
          return axios.get(`/staffs?filters[event]=${eventId}&populate[0]=staff&populate[1]=event&populate[staff][populate][0]=picture&`,{
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
        },
        queryKey: ["getEvent", eventId ],
      });
}

export default useGetStaffs