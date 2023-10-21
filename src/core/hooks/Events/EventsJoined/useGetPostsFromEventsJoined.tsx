import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../../types/app";
import axios from "../../../../utils/axios";
import useAuthen from "../../useAuthen";

interface Event {
  id: number;
  name: string;
  cover: {
    url: string;
  };
  posts: Post[];
}

export interface Activity {
  event: Event;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  owner: {
    id: number;
  };
}

const useGetPostsFromEventsJoined = () => {
  const auth = useAuthen();
  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useQuery<
    AxiosResponse<{ activities: Activity[], events: Event[] }>,
    AxiosError<ResponseErrorType>
  >({
    queryFn: async () => {
      return axios.get(
        `/users/${auth.session.user.id}?populate[0]=activities.event.cover&populate[1]=activities.event.posts.owner&populate[2]=events.cover&populate[3]=events.posts.owner`,
        {
          headers: {
            Authorization: `Bearer ${auth.session.jwt}`,
          },
        }
      );
    },
    queryKey: ["getPostsFromEventsJoined"],
  });
};

export default useGetPostsFromEventsJoined;