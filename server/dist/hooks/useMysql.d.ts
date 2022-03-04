export default function useMysql<T>(sql: string): Promise<Array<T> | Error>;
