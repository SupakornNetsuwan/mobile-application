import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";
import { Event } from "./useGetEvents";

export type DeleteEventSchemaType = {
  eventId?: number;
};

const useDeleteEvent = (
  options?: MutationOptions<
    AxiosResponse<Event>,
    AxiosError<ResponseErrorType>,
    DeleteEventSchemaType
  >
) => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.delete(`/events/${payload.eventId}`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    ...options,
  });
};

export default useDeleteEvent;
