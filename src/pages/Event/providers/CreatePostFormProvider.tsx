import React, { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGetProfile from "../../../core/hooks/useGetProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";
import useGetPost from "../../../core/hooks/useGetPost";
import { useState } from "react";
import type { GetPostResponseType } from "../../../core/hooks/useGetPost";
const CreatePostFormSchema = z.object({
    title: z.string().nonempty("ระบุขื่อโพสต์"),
    content: z.string().nonempty("ระบุคอนเทนต์ของโพสต์"),
    cover:z.string().optional(),
    event:z.string().optional(),
    id:z.string().optional()
})

export type CreatePostFormSchemaType = z.infer<typeof CreatePostFormSchema>

const CreatePostFormProvider: React.FC<{ children: React.ReactNode}> = ({
    children  }) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated") 
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    const methods = useForm<CreatePostFormSchemaType>({
      resolver: zodResolver(CreatePostFormSchema),
      defaultValues: {
        title:"",
        content: "",
        cover: "",
        event: ""
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  export default CreatePostFormProvider;
  