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
const EditPostFormSchema = z.object({
    title: z.string().nonempty("ระบุขื่อโพสต์").optional(),
    content: z.string().nonempty("ระบุคอนเทนต์ของโพสต์").optional(),
    medias:z.string().optional(),
})

export type EditPostFormSchemaType = z.infer<typeof EditPostFormSchema>

const EditPostFormProvider: React.FC<{ children: React.ReactNode, postId?:string}> = ({
    children,postId }) => {

    const authen = useAuthen();
    const [medias, setMedias] = useState<string>("")
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated") 
      throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    const {data, isLoading, error} = useGetPost({postId})!
    const post = useMemo(() => data?.data, [data])
    useEffect(()=>{
      if(post?.data.attributes.medias.data != null){
        setMedias(post?.data.attributes.medias.data[0]?.attributes.url)
      }
    },[post])
    const methods = useForm<EditPostFormSchemaType>({
      resolver: zodResolver(EditPostFormSchema),
      values: {
        title: post?.data.attributes.title,
        content: post?.data.attributes.content,
        medias:  medias
      },
      defaultValues: {
        title:"",
        content: "",
        medias: "",
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  export default EditPostFormProvider;
  