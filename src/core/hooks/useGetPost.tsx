import useAuthen from "./useAuthen";
import type { AxiosResponse, AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axios";
export type OwnerAttributesType ={
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    address: string | null;
    birthdate: string | null;
    isCanCreateEvent: boolean | null;
    createdAt: string;
    updatedAt: string;
  }
  
export type MediaAttributesType = {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
export type CommentDataType = {
    id: number;
    // Add more attributes for comments if needed
  }
  
export type GetPostDataAttributes = {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    owner: {
      data: {
        id: number;
        attributes: OwnerAttributesType;
      };
    };
    medias: {
      data: MediaAttributesType[];
    };
    comments: {
      data: CommentDataType[];
    };
  }
  
export interface GetPostData {
    id: number;
    attributes: GetPostDataAttributes;
  }
  
export interface GetPostResponseType {
    data: GetPostData;
    meta: Record<string, any>; // You can define the meta structure if needed
  }

const useGetPost = (postId:string)=>{
     const auth = useAuthen();
     if (auth.status === "loading" || auth.status === "unauthenticated") return null;

     return useQuery<AxiosResponse<GetPostResponseType>, AxiosError<GetPostResponseType>>({
        queryFn: async () => {
          return axios.get(`/posts/${postId}?populate[0]=attributes&populate[2]=owner&populate[3]=medias&populate[4]=comments`, {
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
        },
        queryKey: ["getPost", postId],
      });
}

export default useGetPost