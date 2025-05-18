import { MongoDbContext } from "@/config/mongo.connect";
import {
  USER_COLLECTION_NAME,
  UserEntity,
} from "@/models/entities/user.entity";
import { IBaseRepository } from "./base.repository";
import bcrypt from "bcrypt";

/**
 * User repository
 */
export interface IUserRepository extends IBaseRepository {
  // tìm user theo email
  findByEmail(email: string): Promise<UserEntity | null | undefined>;

  // hash password
  hashPassword(password: string): Promise<string>;

  // kiểm tra password có hợp lệ
  verifyPassword(user: UserEntity, password: string): Promise<boolean>;

  // thêm user
  insert(user: UserEntity): Promise<boolean>;

  // lấy thông tin user bằng id
  findById(id: string): Promise<UserEntity | null | undefined>;
}

class UserRepository implements IUserRepository {
  private _mongoDbContext: MongoDbContext | null;

  constructor(mongoDbContext: MongoDbContext) {
    this._mongoDbContext = mongoDbContext;
  }

  // tìm user theo email
  async findByEmail(email: string): Promise<UserEntity | null | undefined> {
    let userColl =
      this._mongoDbContext?.getCollection<UserEntity>(USER_COLLECTION_NAME);
    return await userColl?.findOne<UserEntity>({ email });
  }

  async dispose(): Promise<void> {
    const _this = this;
    if (_this._mongoDbContext) {
      _this._mongoDbContext = null;
    }
  }

  // hash password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // kiểm tra password có hợp lệ
  async verifyPassword(user: UserEntity, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.passwordHashed);
  }

  // thêm user
  async insert(user: UserEntity): Promise<boolean> {
    let userColl =
      this._mongoDbContext?.getCollection<UserEntity>(USER_COLLECTION_NAME);
    let result = await userColl?.insertOne(user);
    return !!result?.acknowledged;
  }

  // lấy thông tin user bằng id
  async findById(id: string): Promise<UserEntity | null | undefined> {
    let userColl =
      this._mongoDbContext?.getCollection<UserEntity>(USER_COLLECTION_NAME);
    return await userColl?.findOne({ _id: id });
  }
}

export default UserRepository;
