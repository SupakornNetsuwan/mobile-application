import React from "react";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import useAuthen from "../useAuthen";
import type { GetPostsResponseType } from "../useGetPosts";
import type { PostFormSchemaType } from "../../../pages/Event/providers/PostFormProvider";
const useUpdatePost = (
    postId: string,
    options?: MutationOptions<
    AxiosResponse<GetPostsResponseType>,
    AxiosError<GetPostsResponseType>,
    PostFormSchemaType>
) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
  

  return useMutation({
    mutationFn: async (payload) => {
      return axios.put(
        `/posts/${postId}`,
        {
        data:{
                title: payload.title,
                content: payload.content,
                medias:payload.cover||[] 
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