import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { mongoDbContext } from "../../src/config/mongo.connect";
import {
  UserEntity,
  USER_COLLECTION_NAME,
} from "../../src/models/entities/user.entity";

describe("MongoDbContext", () => {
  beforeAll(async () => {
    await mongoDbContext.connect();
  });

  afterAll(async () => {
    await mongoDbContext.dispose();
  });

  it("kết nối thành công", async () => {
    const userColl =
      mongoDbContext.getCollection<UserEntity>(USER_COLLECTION_NAME);

    expect(userColl).toBeDefined();
  });

  it("dispose thành công", async () => {
    await mongoDbContext.dispose();
    const userColl =
      mongoDbContext.getCollection<UserEntity>(USER_COLLECTION_NAME);

    expect(userColl).toBeUndefined();
  });

  it("throw error nếu env MONGO_URL hoặc MONGO_DB không có giá trị", async () => {
    const context = mongoDbContext;
    const originalUrl = process.env.MONGO_URL;
    const originalDb = process.env.MONGO_DB;

    delete process.env.MONGO_URL;
    delete process.env.MONGO_DB;

    await expect(context.connect()).rejects.toThrow("Thiếu cấu hình MongoDB");

    process.env.MONGO_URL = originalUrl;
    process.env.MONGO_DB = originalDb;
  });
});
