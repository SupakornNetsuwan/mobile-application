import { useMutation, type MutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import axios from "../../../utils/axios";
import { ResponseErrorType } from "../../../types/app";
import useAuthen from "../../../core/hooks/useAuthen";
import { z } from "zod";
import Loading from "../../../core/components/Loading";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const CommentFormSchema = z.object({
    content:z.string().nonempty("ระบุคอนเทนต์คอมเมนต์"),
    postId:z.string().optional(),
    owner:z.string().optional()
})

export type CommentFormSchemaType= z.infer<typeof CommentFormSchema>


const CommentFormProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated")
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
  
    const methods = useForm<CommentFormSchemaType>({
      resolver: zodResolver(CommentFormSchema),
      defaultValues: {
        content:"",
        postId:"",
        owner: ""
      },
    });
  
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  export default CommentFormProvider;