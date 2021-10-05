import { User } from "../types/User";

export interface IGetUsersUseCase {
  execute(): Promise<User[]>;
}
