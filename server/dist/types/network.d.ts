interface ResponseBody<T> {
    status: string;
    data: T | null;
    temp: string;
}
export type { ResponseBody };
