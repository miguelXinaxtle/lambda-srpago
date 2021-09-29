import { inject, injectable } from "tsyringe";
import { ICreateUserUseCase } from "../../core/interfaces/ICreateUserUseCase";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(@inject("IUserRepository") private userRepo: IUserRepository) {}

  execute = async (user: User) => {
    await this.userRepo.createUser(user);
  };
}
