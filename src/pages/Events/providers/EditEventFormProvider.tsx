import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthen from "../../../core/hooks/useAuthen";
import Loading from "../../../core/components/Loading";
import useGetEvent from "../../../core/hooks/useGetEvent";
import { useMemo } from "react";
import { EventSchema, EventSchemaType } from "./AddEventFormProvider";
import LoadingActivityindicator from "../../../core/components/LoadingActivityindicator";

const EditEventFromProvider: React.FC<{ children: React.ReactNode, eventId?: number }> = ({
    children,
    eventId
}) => {
    const authen = useAuthen();
    if (authen.status === "loading") return <Loading />;
    if (authen.status === "unauthenticated") throw new Error("คุณไม่มีสิทธิ์เข้าถึงข้อมูล");

    const { data, isLoading, isError } = useGetEvent(eventId)!;
    const event = useMemo(() => data?.data.data, [data?.data.data]);

    const categories = event?.attributes.categories.data.map(category => category.id)
    const studentYears = event?.attributes.studentAccessYears.data.map(year => year.id)

    const methods = useForm<EventSchemaType>({
        resolver: zodResolver(EventSchema),
        values: {
            name: event?.attributes.name || "",
            description: event?.attributes.description,
            start: new Date(event?.attributes.start || 0).toISOString() || "",
            end: new Date(event?.attributes.end || 0).toISOString() || "",
            // @ts-ignore
            categories: categories,
            // @ts-ignore
            studentAccessYears: studentYears,
            cover: event?.attributes.cover.data ? event?.attributes.cover.data.id.toString() : ""
        },
        defaultValues: {
            name: "",
            description: "",
            start: "",
            end: "",
            categories: [],
            studentAccessYears: [],
            cover: ""
        },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
};



export default EditEventFromProvider;
