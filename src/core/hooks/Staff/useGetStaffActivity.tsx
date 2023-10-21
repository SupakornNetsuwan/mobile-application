import useAuthen from "../useAuthen";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../types/app";
import axios from "../../../utils/axios";

// 😸 ดูว่า user คนนี้ได้เข้าร่วมกิจกรรมที่ eventId นี้หรือไม่ ดู duty และ position ของ user ในกิจกรรมนั้น ๆ ได้

interface StaffActivity {
  id: number;
  attributes: {
    duty: string;
    position: string;
    event: {
      data: {
        id: number;
      };
    };
  };
}

interface StaffActivities {
  data?: StaffActivity[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  owner: {
    id: number
  }
}

const useGetStaffActivity = (userId: number, eventId: number) => {
  const auth = useAuthen();
  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useQuery<
    AxiosResponse<StaffActivities>,
    AxiosError<ResponseErrorType>
  >({
    queryFn: async () => {
      return axios.get(
        `/staffs?filters[staff]=${userId}&filters[event]=${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.session.jwt}`,
          },
        }
      );
    },
    queryKey: ["getStaffActivities", userId, eventId],
  });
};

export default useGetStaffActivity;
