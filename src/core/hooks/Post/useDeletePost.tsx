import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";
type DeletePostResponseType = {
    data: {
      id: number;
    };
  };

export type DeletePostSchemaType = {
    postId: number;
  };
const useDeletePost = (
    options?: MutationOptions<
      AxiosResponse<DeletePostResponseType>,
      AxiosError<ResponseErrorType>,
      DeletePostSchemaType
    >
  ) => {
    const auth = useAuthen();
  
    if (auth.status === "loading" || auth.status === "unauthenticated")
      return null;
  
    return useMutation({
      mutationFn: async (payload) => {
        return axios.delete(`/posts/${payload.postId}`, {
          headers: {
            Authorization: `Bearer ${auth.session.jwt}`,
          },
        });
      },
      ...options,
    });
  };
  
  export default useDeletePost
  
  