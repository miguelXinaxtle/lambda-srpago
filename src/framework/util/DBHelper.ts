import { DynamoDB } from "aws-sdk";
import { IDBHelper } from "../../core/interfaces/IDBHelper";
import { Constants } from "../../core/common/Constants";

export class DBHelper implements IDBHelper {
  private docClient: DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient();
  }

  put = async (tableName: string, item: { [key: string]: any }) => {
    const input: DynamoDB.DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await this.docClient.put(input).promise();
  };

  get = async (tableName: string) => {
    const input: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };
    const result = await this.docClient.scan(input).promise();
    return result.Items
      ? result.Items.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
        }))
      : [];
  };
}
