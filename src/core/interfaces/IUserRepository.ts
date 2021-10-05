import { User } from "../types/User";

export interface IUserRepository {
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  registerUsers(user: User[]): Promise<boolean>;
  getUsersByFile(urlFile: string): Promise<User[]>;
  getUsers(): Promise<User[]>;
}
