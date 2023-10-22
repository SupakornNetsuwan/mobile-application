import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";

export const EventSchema = z
  .object({
    name: z.string().nonempty({ message: "โปรดกรอกชื่อกิจกรรม" }),
    description: z.string().optional(),
    start: z
      .string()
      .datetime()
      .nonempty({ message: "โปรดกรอกวันเริ่มกิจกรรม" }),
    end: z
      .string()
      .datetime()
      .nonempty({ message: "โปรดกรอกวันสิ้นสุดกิจกรรม" }),
    categories: z.number().array().nonempty({
      message: "กรุณาเลือกประเภทของกิจกรรม",
    }),
    studentAccessYears: z.number().array().nonempty({
      message: "กรุณาเลือกชั้นปีสำหรับกิจกรรม",
    }),
    cover: z.string().optional()
  })
  .refine((data) => data.end > data.start, {
    message: "ไม่สามารถเลือกวันสิ้นสุดกิจกรรมก่อนวันเริ่มกิจกรรมได้",
    path: ["end"],
  });

export type EventSchemaType = z.infer<typeof EventSchema>;

const AddEventFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authen = useAuthen();
  if (authen.status === "loading") return <Loading />;
  if (authen.status === "unauthenticated")
    throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const methods = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      description: "",
      start: today.toISOString(),
      end: tomorrow.toISOString(),
      categories: [],
      studentAccessYears: [],
      cover: ""
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default AddEventFormProvider;
