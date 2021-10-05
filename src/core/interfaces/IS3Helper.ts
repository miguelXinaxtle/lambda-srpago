import { User } from "../types/User";

export interface IS3Helper {
  get(bucket: string, key: string): Promise<any>;
  readExcel(bucket: string, key: string): Promise<User[]>;
}
