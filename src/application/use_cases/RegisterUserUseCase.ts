import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../core/interfaces/IRegisterUserUseCase";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(@inject("IUserRepository") private userRepo: IUserRepository) {}

  execute = async (urlFile: string) => {
    const userList: User[] = await this.userRepo.getUsersByFile(urlFile);
    if (userList.length) {
      await this.userRepo.registerUsers(userList);
    }
    return `Elementos insertados ${userList.length}`;
  };
}
