import { Event } from "./useGetEvents";
import { AddEventSchemaType } from "../../../pages/Events/providers/AddEventFormProvider";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";

const useAddEvent = (
  options?: MutationOptions<
    AxiosResponse<Event>,
    AxiosError<ResponseErrorType>,
    AddEventSchemaType
  >
) => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.post(
        `/events`,
        {
          data: {
            name: payload.name,
            description: payload.description,
            start: payload.start,
            end: payload.end,
            categories: payload.categories,
            studentAccessYears: payload.studentAccessYears,
            cover: payload.cover,
            owner: auth.session.user.id.toString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.session.jwt}`,
          },
        }
      );
    },
    ...options,
  });
};

export default useAddEvent;
