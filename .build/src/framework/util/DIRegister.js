"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diContainer = void 0;
const UpdateUserUseCase_1 = require("./../../application/use_cases/UpdateUserUseCase");
const UserRepository_1 = require("./../repositories/UserRepository");
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const UserController_1 = require("../../application/controllers/UserController");
const CreateUserUserCase_1 = require("../../application/use_cases/CreateUserUserCase");
const DBHelper_1 = require("./DBHelper");
const S3Helper_1 = require("./S3Helper");
tsyringe_1.container.registerSingleton("IDBHelper", DBHelper_1.DBHelper);
tsyringe_1.container.registerSingleton("IS3Helper", S3Helper_1.S3Helper);
tsyringe_1.container.register("ICreateUserUseCase", CreateUserUserCase_1.CreateUserUseCase);
tsyringe_1.container.register("IUpdateUserUseCase", UpdateUserUseCase_1.UpdateUserUseCase);
tsyringe_1.container.register("IUserRepository", UserRepository_1.UserRepository);
tsyringe_1.container.register("UserController", UserController_1.UserController);
exports.diContainer = tsyringe_1.container;
//# sourceMappingURL=DIRegister.js.map