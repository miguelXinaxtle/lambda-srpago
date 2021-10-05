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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Helper = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const xlsx_1 = __importDefault(require("xlsx"));
class S3Helper {
    constructor() {
        this.get = (bucket, key) => __awaiter(this, void 0, void 0, function* () {
            aws_sdk_1.default.config.update({
                region: process.env.AWS_REGION,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
            const s3 = new aws_sdk_1.default.S3();
            const data = yield s3.getObject({ Key: key, Bucket: bucket }).promise();
            if (!data || !data.Body)
                throw new Error("An error occurred trying to get file from Bucket");
            return data.Body.toString();
        });
        this.readExcel = (bucket, key) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const s3 = new aws_sdk_1.default.S3();
                const file = s3
                    .getObject({ Key: key, Bucket: bucket })
                    .createReadStream();
                try {
                    const buffers = [];
                    file.on("data", function (data) {
                        buffers.push(data);
                    });
                    file.on("end", function () {
                        const buffer = Buffer.concat(buffers);
                        const workbook = xlsx_1.default.read(buffer);
                        var sheetNameList = workbook.SheetNames;
                        const userList = sheetNameList.length
                            ? xlsx_1.default.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]])
                            : [];
                        resolve(userList);
                    });
                }
                catch (err) {
                    reject([]);
                }
            });
        });
    }
}
exports.S3Helper = S3Helper;
//# sourceMappingURL=S3Helper.js.map