import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useGetProfile from "../../../core/hooks/useGetProfile";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";

const EditProfileSchema = z.object({
  firstname: z.string().nonempty({ message: "โปรดกรอกชื่อจริง" }),
  lastname: z.string().nonempty({ message: "โปรดกรอกนามสกุล" }),
  address: z.string().optional(),
  birthdate: z.string().datetime(),
  pictureId: z.string().optional(), // Picture ID
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;

const EditProfileFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authen = useAuthen();
  if (authen.status === "loading") return <Loading />;
  if (authen.status === "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

  const { data, isStale } = useGetProfile(authen.session.user.id.toString())!;
  const profile = useMemo(() => data?.data, [data]);
  const methods = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    values: {
      firstname: profile?.username.split(" ")[0] || "",
      lastname: profile?.username.split(" ")[1] || "",
      birthdate: new Date(profile?.birthdate || 0).toISOString(),
      address: profile?.address || "",
      pictureId: profile?.picture?.id.toString() || "",
    },
    defaultValues: {
      firstname: "",
      lastname: "",
      address: "",
      birthdate: new Date(0).toISOString(),
      pictureId: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default EditProfileFormProvider;
