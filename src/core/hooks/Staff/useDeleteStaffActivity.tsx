// 😸 สำหรับกดเข้าร่วมกิจกรรม จะไปเพิ่มใน collecion staff ที่เก็บ relation ระหว่างกิจกรรมกับ user

import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";

type DeleteStaffResponseType = {
  data: {
    id: number;
  };
};

export type DeleteStaffSchemaType = {
  staffId: number;
};

const useDeleteStaffActivity = (
  options?: MutationOptions<
    AxiosResponse<DeleteStaffResponseType>,
    AxiosError<ResponseErrorType>,
    DeleteStaffSchemaType
  >
) => {
  const auth = useAuthen();

  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.delete(`/staffs/${payload.staffId}`, {
        headers: {
          Authorization: `Bearer ${auth.session.jwt}`,
        },
      });
    },
    ...options,
  });
};

export default useDeleteStaffActivity;
