import type { GetPostResponseType } from "../useGetPost";
import { AddEventSchemaType } from "../../../pages/Events/providers/AddEventFormProvider";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";
import type { PostFormSchemaType } from "../../../pages/Event/providers/PostFormProvider";
const useCreatePost = (
    options?: MutationOptions<
    AxiosResponse<GetPostResponseType>, 
    AxiosError<GetPostResponseType>, 
    PostFormSchemaType
    >
) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated")
      return null;
    
      return useMutation({
        mutationFn: async (payload) => {
          return axios.post(
            `/posts`,
            {
              data: {
               title: payload.title,
               content: payload.content,
               cover:payload.cover,
               owner: auth.session.user.id.toString(),
               event: payload.event
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
}

export default useCreatePost