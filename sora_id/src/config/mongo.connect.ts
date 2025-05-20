import { Db, Document, MongoClient, ServerApiVersion } from "mongodb";

export class MongoDbContext {
  private static _instance?: MongoDbContext;
  private _db?: Db;

  private _client?: MongoClient;
  private constructor() {}
  async connect() {
    const _this = this;
    if (!process.env.MONGO_URL || !process.env.MONGO_DB) {
      throw new Error("Thiếu cấu hình MongoDB");
    }
    _this._client = new MongoClient(process.env.MONGO_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await _this._client?.connect();
    _this._db = _this._client?.db(process.env.MONGO_DB);
    await _this._db?.command({ ping: 1 });
  }

  async dispose() {
    const _this = this;
    _this._db = undefined;
    await _this._client?.close();
  }

  getCollection<TEntity extends Document>(collectionName: string) {
    let coll = this._db?.collection<TEntity>(collectionName);
    return coll;
  }

  static getInstance() {
    const _this = this;
    if (!_this._instance) {
      _this._instance = new MongoDbContext();
    }
    return _this._instance;
  }
}

export const mongoDbContext = MongoDbContext.getInstance();
