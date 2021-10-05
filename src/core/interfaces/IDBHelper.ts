import { User } from "../types/User";

export interface IDBHelper {
  put(tableName: string, item: { [key: string]: any }): Promise<void>;

  get(tableName: string): Promise<User[]>;
}
