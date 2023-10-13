import useAuthen from "./useAuthen";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
export type GetPostResponseType = {
    data: PostType[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
export type PostType = {
    id: number;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      owner: OwnerType;
      comments: Comment[];
      medias: MediaType;
    };
  };
  export type MediaType = {
    data:[{
        id: number;
        attributes: {
        url: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        };
    }]
  };
  
export type OwnerType = {
    data: {
      id: number;
      attributes: {
        username: string;
        picture: {
          data: {
            id: number;
            attributes: {
              url: string;
            };
          };
        };
        activities: {
          data: ActivityType[];
        };
      };
    };
  };
  
export type ActivityType= {
    id: number;
    attributes: {
      duty: string;
      position: string;
    };
  };
  
export  type CommenType = {
    id: number;
    attributes: {
      content: string;
      owner: OwnerType;
    };
  };
  
const useGetPost = (postId:string)=>{
     const auth = useAuthen();
     if (auth.status === "loading" || auth.status === "unauthenticated") return null;

     return useQuery<AxiosResponse<GetPostResponseType>, AxiosError<GetPostResponseType>>({
        queryFn: async () => {
          return axios.get(`/posts?filters[event]=${postId}&populate[owner][fields][0]=username&populate[owner][populate][picture][fields][0]=url&populate[owner][populate][activities][fields][0]=duty&populate[owner][populate][activities][fields][1]=position&populate[owner][populate][activities][filters][event]=1&populate[comments][fields][0]=content&populate[comments][fields][1]=createAt&populate[comments][populate][owner][fields][0]=username&populate[comments][populate][owner][populate][picture][fields][0]=url&populate[comments][populate][owner][populate][activities][fields][0]=duty&populate[comments][populate][owner][populate][activities][fields][1]=position&populate[comments][populate][owner][populate][activities][filters][event]=${postId}`, 
          {
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
        },
        queryKey: ["getPost", postId],
      });
}

export default useGetPost