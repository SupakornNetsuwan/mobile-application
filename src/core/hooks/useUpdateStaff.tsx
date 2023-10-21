import React from "react";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { AxiosResponse, AxiosError } from "axios";
import type { GetStaffResponseType } from "./useGetStaffs";
import { ResponseErrorType } from "../../types/app";
import useAuthen from "./useAuthen";
import { EditStaffSchemaType } from "../../pages/Event/providers/EditStaffFormProvider";
import { position } from "native-base/lib/typescript/theme/styled-system";
type UpdateStaffType = {
    data:{
        id:number
        attributes:{
            duty:string
            position:string
        }
    }
}

const useUpdateStaff = (
    userId: string,
    options?: MutationOptions<
      AxiosResponse<UpdateStaffType>,
      AxiosError<ResponseErrorType>,
      EditStaffSchemaType
    >
)=>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;

    return useMutation({
        mutationFn: async (payload) => {
          return axios.put(
            `/staffs/${userId}`,
            {
                data:{
                    duty:payload.duty,
                    position:payload.position
                }
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
}

export default useUpdateStaff