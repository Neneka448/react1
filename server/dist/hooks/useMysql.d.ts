export default function useMysql<T>(sql: string): Promise<Array<T> | Error>;
export declare function useTransaction<T extends () => any>(fn: T): Promise<void>;
