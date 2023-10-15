import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";

export interface GetEventResponseType  {
    data:{
        id : number,
        attributes: {
                name : string,
                description: string,
                start: string,
                end: string,
                createdAt: string,
                updatedAt: string,
                publishedAt: string,
                posts: {
                    data: [
                        {
                            id: number,
                            attributes: {
                                title: string,
                                content: string,
                                createdAt: string,
                                updatedAt: string
                            }
                        }
                    ]
                }
            }
    }

}

const useGetEvent = (eventId: string) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
    return useQuery<AxiosResponse<GetEventResponseType>, AxiosError<GetEventResponseType>>({
        queryFn: async () => {
          return axios.get(`/events/${eventId}?populate=posts`, {
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
        },
        queryKey: ["getEvent", eventId ],
      });
}

export default useGetEvent