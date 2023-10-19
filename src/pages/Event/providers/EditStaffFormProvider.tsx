import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGetProfile from "../../../core/hooks/useGetProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";
import useGetStaff from "../../../core/hooks/useGetStaff";

const EditStaffSchema = z.object({
    duty: z.string().nonempty({ message: "โปรดกรอกหน้าที่" }),
    position: z.string().nonempty({ message: "โปรดกรอกต่ำแหน่ง" }),
})

export type EditStaffSchemaType = z.infer<typeof EditStaffSchema>;

const EditStaffFormProvider: React.FC<{ children: React.ReactNode, starffId:string }> = ({ children, starffId }) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");
    
    const {data, isLoading, error} = useGetStaff(starffId)!
    const staff = useMemo(() => data?.data, [data]);

    const methods = useForm<EditStaffSchemaType>({
        resolver: zodResolver(EditStaffSchema),
        values:{
            duty:staff?.data.attributes.duty || "",
            position:staff?.data.attributes.position || ""
        },
        defaultValues:{
            duty:"",
            position:""
        }
    })
    return <FormProvider {...methods} >{children}</FormProvider>
}

export default EditStaffFormProvider