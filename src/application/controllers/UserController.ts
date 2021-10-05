import { inject, injectable } from "tsyringe";
import { ICreateUserUseCase } from "../../core/interfaces/ICreateUserUseCase";
import { IUpdateUserUseCase } from "../../core/interfaces/IUpdateUserUseCase";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { User, UserSchema } from "../../core/types/User";
import { IRegisterUserUseCase } from "@src/core/interfaces/IRegisterUserUseCase";
import { IGetUsersUseCase } from "@src/core/interfaces/IGetUsersUseCase";

@injectable()
export class UserController {
  constructor(
    @inject("ICreateUserUseCase") private createUserUseCase: ICreateUserUseCase,
    @inject("IUpdateUserUseCase") private updateUserUseCase: IUpdateUserUseCase,
    @inject("IRegisterUserUseCase")
    public registerUserUseCase: IRegisterUserUseCase,
    @inject("IGetUsersUseCase")
    public getUsersUseCase: IGetUsersUseCase
  ) {}

  createUser = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const user: User = UserSchema.parse({
      name: "Renata",
      email: "renata.reyes@hotmail.com",
    });
    // const user: User = UserSchema.parse(JSON.parse(event.body!));
    await this.createUserUseCase.execute(user);
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };

    return response;
  };

  updateUser = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const user: User = UserSchema.parse(JSON.parse(event.body!));
    await this.updateUserUseCase.execute(user);
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
      }),
    };

    return response;
  };

  registerUsers = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const urlFile = "testExcel.xlsx";
    const file = await this.registerUserUseCase.execute(urlFile);
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: file,
      }),
    };

    return response;
  };

  getUsers = async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    const userList = await this.getUsersUseCase.execute();
    const response: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: userList,
      }),
    };

    return response;
  };
}
