import useAuthen from "../../../core/hooks/useAuthen";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse , AxiosError} from "axios";
import axios from "axios";
export interface OwnerDataGetResponseType {
    data:{
        id: number;
        attributes: {
        name: string;
        owner: {
            data: {
                id: number;
                attributes: {
                    username: string;
                };
            };
            }; 
        };
    }
};
const useGetOwnerPost = (eventId: string)=>{
    console.log(eventId);
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated") return null;
    console.log(auth.session.jwt)
    return useQuery<AxiosResponse, AxiosError>({
        queryFn: async () => {
          return axios.get(`/events/${eventId}?[fields][0]=name&populate[0]=owner`, {
            headers: {
              Authorization: `Bearer ${auth.session.jwt}`,
            },
          });
          
        },
        queryKey: ["getOwnerPost", eventId ],
      });
} 

export default useGetOwnerPost