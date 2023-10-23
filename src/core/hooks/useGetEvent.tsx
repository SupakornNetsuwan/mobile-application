import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";

export interface GetEventResponseType {
  data: {
    id: number,
    attributes: {
      name: string,
      description: string,
      start: string,
      end: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string,
      categories: {
        data: {
          id: number,
          attributes: {
            name: string
          }
        }[]
      },
      studentAccessYears: {
        data: {
          id: number,
          attributes: {
            name: string
          }
        }[]
      },
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
      },
      owner: {
        data: {
          id: number
        }
      },
      cover: {
        data: {
          id: number,
          attributes: {
            url: string
          }
        }
      }
    }
  }
}

const useGetEvent = (eventId?: number) => {
  const auth = useAuthen();
  if (auth.status === "loading" || auth.status === "unauthenticated") return null;
  return useQuery<AxiosResponse<GetEventResponseType>, AxiosError<GetEventResponseType>>({
    queryFn: async () => {
      return axios.get(`/events/${eventId}?populate[0]=categories&populate[1]=studentAccessYears&populate[2]=cover&populate[3]=owner`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    queryKey: ["getEvent", eventId],
  });
}

export default useGetEvent