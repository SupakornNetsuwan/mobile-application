import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../../utils/axios";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../../types/app";
import useAuthen from "../../useAuthen";

export interface Category {
    id: number;
    attributes: {
        name: string;
    };
}

export interface Categories {
    data?: Category[]
}

const useGetCategories = () => {
    const auth = useAuthen();
   
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
    
    return useQuery<AxiosResponse<Categories>, AxiosError<ResponseErrorType>>({
        queryFn: async () => {
            return axios.get(`/categories`, {
                headers: {
                    Authorization: `Bearer ${auth.session.jwt}`,
                },
            });
        },
        staleTime: 0,
        queryKey: ["getCategories"],
    });
};
export default useGetCategories;
