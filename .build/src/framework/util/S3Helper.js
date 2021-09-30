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
                throw new Error('An error occurred trying to get file from Bucket');
            return data.Body.toString();
        });
    }
}
exports.S3Helper = S3Helper;
//# sourceMappingURL=S3Helper.js.map