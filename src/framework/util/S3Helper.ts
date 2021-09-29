import AWS from "aws-sdk";
import fs from "fs";
import { Constants } from "../../core/common/Constants";
import { IS3Helper } from "@src/core/interfaces/IS3Helper";

export class S3Helper implements IS3Helper {
  constructor() {}
  get(bucket: string, key: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      try {
        const s3 = new AWS.S3({
          accessKeyId: "SRPAGOTEST",
          secretAccessKey: "SRPAGOTEST",
          region: "us-east-1",
        });
        s3.getObject({ Key: key, Bucket: bucket })
          .promise()
          .then((res) => {
            console.log("res=>", res.Body);
            if (res.Body) resolve(res.Body?.toString());
            // if (res.Body) {
            //   fs.writeFile("test.txt", res.Body.toString(), (err) => {
            //     if (err) console.log("Error, file bucket", err);
            //   });
            // }
          })
          .catch((err) => reject(JSON.stringify(err)));
      } catch (err) {
        reject("12");
      }
    });
  }
}
