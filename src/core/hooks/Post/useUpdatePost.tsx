import React from "react";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { AxiosResponse, AxiosError } from "axios";
import useAuthen from "../useAuthen";
import { EditPostFormSchemaType } from "../../../pages/Event/providers/EditPostFormProvider";
type UpdatePostType = {
  data: {
    id: number
    attributes: {
      title: string
      content: string
    }
  }
}
const useUpdatePost = (
  postId: string,
  options?: MutationOptions<
    AxiosResponse<UpdatePostType>,
    AxiosError<UpdatePostType>,
    EditPostFormSchemaType>
) => {
  const auth = useAuthen();
  if (auth.status === "loading" || auth.status === "unauthenticated") return null;

  return useMutation({
    mutationFn: async (payload) => {
      return axios.put(
        `/posts/${postId}`,
        {
          data: {
            title: payload.title,
            content: payload.content,
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

};

export default useUpdatePost