import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import { beforeAll } from "@jest/globals";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URL = mongoServer.getUri();
  process.env.MONGO_DB = "test_db";
});
