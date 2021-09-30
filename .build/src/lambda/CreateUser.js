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
exports.handler = void 0;
require("reflect-metadata");
const DIRegister_1 = require("../framework/util/DIRegister");
require("reflect-metadata");
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    const userController = DIRegister_1.diContainer.resolve("UserController");
    return yield userController.createUser(event);
});
exports.handler = handler;
//# sourceMappingURL=CreateUser.js.map