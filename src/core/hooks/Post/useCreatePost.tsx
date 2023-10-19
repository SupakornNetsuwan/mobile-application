import type { GetPostsResponseType } from "../useGetPosts";
import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../useAuthen";
import type { PostFormSchemaType } from "../../../pages/Event/providers/PostFormProvider";
const useCreatePost = (
    options?: MutationOptions<
    AxiosResponse<GetPostsResponseType>, 
    AxiosError<GetPostsResponseType>, 
    PostFormSchemaType
    >
) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated")
      return null;
    
      return useMutation({
        mutationFn: async (payload) => {
          console.log(payload)
          return axios.post(
            `/posts`,
            {
              data: {
               title: payload.title||"" ,
               content: payload.content||"",
               medias:payload.cover || [],
               owner: auth.session.user.id.toString() ,
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