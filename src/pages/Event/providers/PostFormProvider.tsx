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
const PostFormSchema = z.object({
    title: z.string().nonempty("ระบุขื่อโพสต์"),
    content: z.string().nonempty("ระบุคอนเทนต์ของโพสต์"),
    cover:z.string().optional(),
    event:z.string().optional(),
    id:z.string().optional()
})

export type PostFormSchemaType = z.infer<typeof PostFormSchema>

const PostFormProvider: React.FC<{ children: React.ReactNode, postId:string, eventIdParam:string | undefined, isEdit:boolean }> = ({
    children,postId,eventIdParam,isEdit
  }) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated") 
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    const { data, isLoading, error } = useGetPost({postId:postId})!;
    if(error){
      console.log(error)
    }
    const post = useMemo(() => data?.data, [data?.data, postId]);
    const methods = useForm<PostFormSchemaType>({
      resolver: zodResolver(PostFormSchema),
      values: {
        title:post?.data.attributes.title || "",
        content:post?.data.attributes.content||"",
        cover:"",
        event:post?.data.id.toString()|| ""
      },
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
  