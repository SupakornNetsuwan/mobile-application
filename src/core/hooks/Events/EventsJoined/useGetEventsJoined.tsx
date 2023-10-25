import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../../types/app";
import axios from "../../../../utils/axios";
import useAuthen from "../../useAuthen";

interface Event {
    position: string,
    event: {
        id: number;
        name: string;
        cover: {
            url: string;
        };
    }
}

const useGetEventsJoined = () => {
    const auth = useAuthen();
    if (auth.status === "loading" || auth.status === "unauthenticated")
        return null;
    return useQuery<
        AxiosResponse<{ activities: Event[] }>,
        AxiosError<ResponseErrorType>
    >({
        queryFn: async () => {
            return axios.get(
                `/users/${auth.session.user.id}?populate[0]=activities&populate[1]=activities.event&populate[2]=activities.event.cover`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.session.jwt}`,
                    },
                }
            );
        },
        queryKey: ["getEventsJoined"],
    });
};

export default useGetEventsJoined;