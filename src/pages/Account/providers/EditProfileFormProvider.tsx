import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EditProfileSchema = z.object({
  firstname: z.string().nonempty({ message: "โปรดกรอกชื่อจริง" }),
  lastname: z.string().nonempty({ message: "โปรดกรอกนามสกุล" }),
  address: z.string(),
  birthdate: z.number(),
  pictureId: z.string(), // Picture ID
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;

const EditProfileFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      address: "",
      birthdate: 0,
      pictureId: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default EditProfileFormProvider;
