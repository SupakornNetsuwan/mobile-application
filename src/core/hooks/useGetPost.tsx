import useAuthen from "./useAuthen";
import { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";

type useGetPostProp ={
    postId:string|undefined
}

export type GetPostResponseType = {
    data:{
        id:number,
        attributes:{
            title:string
            content:string
            medias:{
                data:[
                    {
                        attributes:{
                            url:string
                        }
                    }
                ]
            }
            event:{
                data:{
                    id:number
                }
            }
        }
    }
}
const useGetPost = ({postId}:useGetPostProp) =>{
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
    if(postId==""){
        postId="11111111111111111111111111111111111111111111"
    }
    return useQuery<AxiosResponse<GetPostResponseType>, AxiosError<GetPostResponseType>>({
        queryFn: async ()=>{
            return axios.get(`posts/${postId}?populate[0]=medias&populate[1]=event`,
            {
                headers: {
                    Authorization: `Bearer ${auth.session.jwt}`,
                  },
            })
        },
        queryKey:["getPost", postId],
    });
}

export default useGetPost