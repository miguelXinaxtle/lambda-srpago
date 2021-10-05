import { IGetUsersUseCase } from "./../../core/interfaces/IGetUsersUseCase";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(@inject("IUserRepository") private userRepo: IUserRepository) {}

  execute = async () => {
    return await this.userRepo.getUsers();
  };
}
