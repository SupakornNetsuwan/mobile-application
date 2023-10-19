import type { CommentType } from "../useGetPosts";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";
import type { CommentFormSchemaType } from "../../../pages/Event/providers/CommentFormProvider";
import { optional } from "zod";

const useCreateComment = (
    options?: MutationOptions<AxiosResponse<CommentType>, AxiosError<CommentType>, CommentFormSchemaType>
  ) => {
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
  
    return useMutation({
      mutationFn: async (payload) => {
        console.log(payload.postId)
        return axios.post(
          `/comments`,
          {
            data: {
              content: payload.content,
              post: payload.postId,
              owner: payload.owner
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
  
  export default useCreateComment;