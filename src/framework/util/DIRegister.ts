import { UpdateUserUseCase } from "./../../application/use_cases/UpdateUserUseCase";
import { UserRepository } from "./../repositories/UserRepository";
import "reflect-metadata";
import { container } from "tsyringe";
import { UserController } from "../../application/controllers/UserController";
import { CreateUserUseCase } from "../../application/use_cases/CreateUserUserCase";
import { DBHelper } from "./DBHelper";
import { S3Helper } from "./S3Helper";

container.registerSingleton("IDBHelper", DBHelper);
container.registerSingleton("IS3Helper", S3Helper);
container.register("ICreateUserUseCase", CreateUserUseCase);
container.register("IUpdateUserUseCase", UpdateUserUseCase);
container.register("IUserRepository", UserRepository);
container.register("UserController", UserController);

export const diContainer = container;
