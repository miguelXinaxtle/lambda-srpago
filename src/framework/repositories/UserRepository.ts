import { S3Helper } from "./../util/S3Helper";
import { IUserRepository } from "./../../core/interfaces/IUserRepository";
import { inject, injectable } from "tsyringe";
import { IDBHelper } from "../../core/interfaces/IDBHelper";
import { User } from "../../core/types/User";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject("IDBHelper") private dbHelper: IDBHelper) {}

  registerUsers(userList: User[]): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        for (const item of userList)
          await this.dbHelper.put("User", { ...item, id: uuidv4() });
        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }

  getUsersByFile = async (urlFile: string) => {
    const s3 = new S3Helper();
    return await s3.readExcel("onexlab", urlFile);
  };

  getUsers(): Promise<{ id: string; name: string; email: string }[]> {
    return this.dbHelper.get("User");
  }

  createUser = async (user: User) => {
    await this.dbHelper.put("User", user);
  };

  updateUser = async (user: User) => {
    await this.dbHelper.put("User", user);
  };
}
