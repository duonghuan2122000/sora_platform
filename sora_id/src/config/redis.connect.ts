import { Redis } from "ioredis";

const REDIS_PREFIX_KEY = "sora:";

type IsString<T> = T extends string ? true : false;

export class RedisDbContext {
  private static _instance?: RedisDbContext;

  private _client?: Redis;

  private constructor() {}

  async connect() {
    const _this = this;
    if (!process.env.REDIS_URL) {
      throw "Thiếu cấu hình Redis";
    }
    _this._client = new Redis(process.env.REDIS_URL);
  }

  async dispose() {
    const _this = this;
    _this._client = undefined;
  }

  static getInstance() {
    const _this = this;
    if (!_this._instance) {
      _this._instance = new RedisDbContext();
    }
    return _this._instance;
  }

  /**
   * Set cache key
   */
  async set<TDto extends string | number | object>(
    key: string,
    value: TDto,
    expiresIn?: number
  ): Promise<boolean> {
    const _this = this;
    if (!_this._client) {
      return false;
    }
    let valStr: string;
    if (typeof value !== "string") {
      valStr = JSON.stringify(value);
    } else {
      valStr = value;
    }
    let keyCache = `${REDIS_PREFIX_KEY}${key}`;
    let result = await _this._client.set(keyCache, valStr);
    if (result != "OK") {
      return false;
    }
    if (expiresIn) {
      await _this._client.expire(keyCache, expiresIn);
    }
    return true;
  }

  private checkType<TDto>(value: string): IsString<TDto> {
    return (typeof value === "string") as IsString<TDto>;
  }

  /**
   * Get cache key
   */
  async get<TDto extends string | number | object>(
    key: string,
    { isString }: { isString: boolean } = { isString: false }
  ): Promise<TDto | null> {
    const _this = this;
    if (!_this._client) {
      return null;
    }
    let keyCache = `${REDIS_PREFIX_KEY}${key}`;
    let valStr = await _this._client.get(keyCache);
    if (!valStr) {
      return null;
    }
    if (isString) {
      return valStr as TDto;
    }
    return JSON.parse(valStr) as TDto;
  }
}

export const redisDbContext = RedisDbContext.getInstance();
