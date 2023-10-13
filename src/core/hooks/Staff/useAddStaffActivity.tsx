// 😸 สำหรับกดเข้าร่วมกิจกรรม จะไปเพิ่มใน collecion staff ที่เก็บ relation ระหว่างกิจกรรมกับ user

import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";

type AddStaffResponseType = {
  data: {
    id: number;
  };
};

export type AddStaffSchemaType = {
  eventId: number;
};

const useAddStaffActivity = (
  options?: MutationOptions<
    AxiosResponse<AddStaffResponseType>,
    AxiosError<ResponseErrorType>,
    AddStaffSchemaType
  >
) => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.post(
        `/staffs`,
        {
          data: {
            event: payload.eventId,
            staff: auth.session.user.id,
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

export default useAddStaffActivity;
