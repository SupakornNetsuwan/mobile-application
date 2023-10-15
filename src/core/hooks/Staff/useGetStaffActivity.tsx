import useAuthen from "../useAuthen";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse, AxiosError } from "axios";
import { ResponseErrorType } from "../../../types/app";
import axios from "../../../utils/axios";

// 😸 ดูว่า user คนนี้ได้เข้าร่วมกิจกรรมที่ eventId นี้หรือไม่ ดู duty และ position ของ user ในกิจกรรมนั้น ๆ ได้

interface StaffActivity {
  id: number
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

const useGetStaffActivity = (eventId: number) => {
  const auth = useAuthen();
  if (auth.status === "loading" || auth.status === "unauthenticated")
    return null;

  return useQuery<
    AxiosResponse<StaffActivities>,
    AxiosError<ResponseErrorType>
  >({
    queryFn: async () => {
      return axios.get(
        `/staffs?populate[staff][filters][id]=${auth.session.user.id}&filters[event]=${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.session.jwt}`,
          },
        }
      );
    },
    queryKey: ["getStaffActivities", eventId],
  });
};

export default useGetStaffActivity;
