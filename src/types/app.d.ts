export type ResponseErrorType = {
    data: Recod<String, String>;
    error: {
        status: number;
        name: string;
        message: string;
        details: Details;
    };
}

/**
 * @description ช่วยทำให้ข้อมูลของ Type ที่มีการ Nested สามารถคลี่ออกมาดูด้านในได้
 */

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}