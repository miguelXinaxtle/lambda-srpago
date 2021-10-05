"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHelper = void 0;
const aws_sdk_1 = require("aws-sdk");
class DBHelper {
    constructor() {
        this.put = (tableName, item) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                TableName: tableName,
                Item: item,
            };
            yield this.docClient.put(input).promise();
        });
        this.get = (tableName) => __awaiter(this, void 0, void 0, function* () {
            const input = {
                TableName: tableName,
            };
            const result = yield this.docClient.scan(input).promise();
            return result.Items
                ? result.Items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                }))
                : [];
        });
        this.docClient = new aws_sdk_1.DynamoDB.DocumentClient();
    }
}
exports.DBHelper = DBHelper;
//# sourceMappingURL=DBHelper.js.map