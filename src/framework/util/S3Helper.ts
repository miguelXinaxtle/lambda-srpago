import AWS from "aws-sdk";
import fs from "fs";
import { Constants } from "../../core/common/Constants";
import { IS3Helper } from "@src/core/interfaces/IS3Helper";

export class S3Helper implements IS3Helper {
  constructor() {}
  public get = async (bucket: string, key: string): Promise<string> => {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    
      const s3 = new AWS.S3();
      const data = await s3.getObject({ Key: key, Bucket: bucket }).promise();
      if (!data || !data.Body) throw new Error('An error occurred trying to get file from Bucket')
      return data.Body.toString();
  };
}
