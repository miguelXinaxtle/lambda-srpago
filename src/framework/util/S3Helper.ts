import AWS from "aws-sdk";
import { Constants } from "../../core/common/Constants";
import { IS3Helper } from "@src/core/interfaces/IS3Helper";
import XLSX from "xlsx";
import { User } from "@src/core/types/User";

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
    if (!data || !data.Body)
      throw new Error("An error occurred trying to get file from Bucket");
    return data.Body.toString();
  };

  public readExcel = async (bucket: string, key: string): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
      const s3 = new AWS.S3();
      const file = s3
        .getObject({ Key: key, Bucket: bucket })
        .createReadStream();
      try {
        const buffers: any[] = [];

        file.on("data", function (data: any) {
          buffers.push(data);
        });

        file.on("end", function () {
          const buffer = Buffer.concat(buffers);
          const workbook = XLSX.read(buffer);
          var sheetNameList = workbook.SheetNames;
          const userList: User[] = sheetNameList.length
            ? XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])
            : [];
          resolve(userList);
        });
      } catch (err) {
        reject([]);
      }
    });
  };
}
