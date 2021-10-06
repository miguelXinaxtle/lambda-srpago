import { ICreateUserUseCase } from "../../src/core/interfaces/ICreateUserUseCase";
import { IUpdateUserUseCase } from "../../src/core/interfaces/IUpdateUserUseCase";
import { IRegisterUserUseCase } from "../../src/core/interfaces/IRegisterUserUseCase";
import { IGetUsersUseCase } from "../../src/core/interfaces/IGetUsersUseCase";
import { UserController } from "../../src/application/controllers/UserController";
import { mock } from "jest-mock-extended";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as fs from "fs";
import path from "path";
import { NIL as NIL_UUID } from "uuid";
import { v4 as uuidv4 } from "uuid";

describe("UserController", () => {
  describe("createUser", () => {
    test("test valid user data", async () => {
      const rawdata = fs.readFileSync(
        path.resolve(__dirname, "../testUtil/APIGatewayProxyEvent.json"),
        "utf-8"
      );
      const apiProxyEvent: APIGatewayProxyEvent = JSON.parse(rawdata);
      const user = {
        id: uuidv4(),
        name: "pratik",
        email: "abcd@gmail.com",
      };

      apiProxyEvent.body = JSON.stringify(user);

      const mockCreateUserCase = mock<ICreateUserUseCase>();
      const mockUpdateUserCase = mock<IUpdateUserUseCase>();
      const mockRegisterUserCase = mock<IRegisterUserUseCase>();
      const mockGetUsersCase = mock<IGetUsersUseCase>();
      mockCreateUserCase.execute.mockResolvedValue();
      mockUpdateUserCase.execute.mockResolvedValue();
      mockRegisterUserCase.execute.mockResolvedValue("test.json");
      mockGetUsersCase.execute.mockResolvedValue([
        { id: NIL_UUID, name: "miguel", email: "destajador57@hotmail.com" },
      ]);

      const userController = new UserController(
        mockCreateUserCase,
        mockUpdateUserCase,
        mockRegisterUserCase,
        mockGetUsersCase
      );

      const result = await userController.createUser(apiProxyEvent);
      console.log("result", result);
      expect(result.statusCode).toEqual(200);
    });
  });
});
