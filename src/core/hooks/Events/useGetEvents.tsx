import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";

// เกียร์เพิ่ม owner กับ staff เข้ามาด้วย owner เอาไว้เช็คว่า event นี้มีเจ้าของคือใคร
export interface Event {
  id: number;
  attributes: {
    name: string;
    description: string;
    start: string;
    end: string;
    cover?: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    owner: {
      data: {
        id: number;
      };
    };
    staffs: {
      data: [
        {
          id: number;
          attributes: {
            staff: {
              data: {
                id: number;
              };
            };
          };
        },
      ];
    };
  };
}

export interface Events {
  data: Event[];
}

const useGetEvents = () => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated") return null;

  return useQuery<AxiosResponse<Events>, AxiosError<ResponseErrorType>>({
    queryFn: async () => {
      return axios.get(`/events`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    staleTime: 0,
    queryKey: ["getEvents"],
  });
};
export default useGetEvents;
