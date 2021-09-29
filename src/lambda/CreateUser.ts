import { S3Helper } from "./../framework/util/S3Helper";
import "reflect-metadata";
import { diContainer } from "../framework/util/DIRegister";
import {
  Handler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { UserController } from "../application/controllers/UserController";

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let res = "1";
  try {
    const s3Helper = new S3Helper();
    res = "2";
    res = await s3Helper.get("onexlab", "test.json");
  } catch (err) {
    console.log(err);
    console.info(err);
    res = "20: " + JSON.stringify(err);
  }
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      success: res,
    }),
  };

  return response;
};
