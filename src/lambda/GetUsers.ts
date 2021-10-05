import "reflect-metadata";
import { UserController } from "../application/controllers/UserController";
import { diContainer } from "../framework/util/DIRegister";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import "reflect-metadata";

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const userController: UserController = diContainer.resolve("UserController");
  return await userController.getUsers(event);
};
