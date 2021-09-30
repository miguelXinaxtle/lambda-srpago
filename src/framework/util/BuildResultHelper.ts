import { APIGatewayProxyResult } from "aws-lambda";

export class BuildResultHelper {
  public static build = (
    data: any,
    statusCode: number
  ): APIGatewayProxyResult => {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        success: data,
      }),
    };
  };
}
