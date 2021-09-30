import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import "reflect-metadata";
import { BuildResultHelper } from "../framework/util/BuildResultHelper";
import { S3Helper } from "./../framework/util/S3Helper";

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const s3Helper = new S3Helper();
    const s3Data: string = await s3Helper.get('onexlab', "example.json"); // Change for event values
    return BuildResultHelper.build(s3Data, 200);
  } catch (err) {
    return BuildResultHelper.build(err, 200);
  }
};
