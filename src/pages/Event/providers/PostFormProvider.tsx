import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGetProfile from "../../../core/hooks/useGetProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";

const PostFormSchema = z.object({
    title: z.string().nonempty("ระบุขื่อโพสต์"),
    content: z.string().nonempty("ระบุคอนเทนต์ของโพสต์"),
    cover:z.string().optional(),
    event:z.string().optional()
})

export type PostFormSchemaType = z.infer<typeof PostFormSchema>

const PostFormProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated")
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
  
    const methods = useForm<PostFormSchemaType>({
      resolver: zodResolver(PostFormSchema),
      defaultValues: {
        title:"",
        content: "",
        cover: "",
        event: ""
      },
    });
  
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  export default PostFormProvider;
  