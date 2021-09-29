import { inject, injectable } from "tsyringe";
import { IUpdateUserUseCase } from "../../core/interfaces/IUpdateUserUseCase";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(@inject("IUserRepository") private userRepo: IUserRepository) {}

  execute = async (user: User) => {
    await this.userRepo.updateUser(user);
  };
}
