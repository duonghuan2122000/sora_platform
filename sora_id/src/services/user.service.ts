import { responseInfo } from "@/models/consts/response.const";
import { ResponseBase, TokenInfo } from "@/models/dtos/response.dto";
import { IUserRepository } from "@/repositories/user.repository";
import { IBaseService } from "./base.service";
import { UserEntity } from "@/models/entities/user.entity";
import { redisDbContext } from "@/config/redis.connect";
import {
  generateToken,
  getRefreshTokenCacheKey,
  getTokenCacheKey,
} from "@/utils/token.util";
import { GrantTokenType, TokenType } from "@/models/enums/common.enum";

export interface GrantTokenUserInput {
  // Loại grant
  grantType: GrantTokenType;

  // username
  username?: string;

  // mật khẩu
  password?: string;

  // refresh token
  refreshToken?: string;
}

export interface GrantTokenUserResult {
  // access token
  accessToken: string;

  // loại token
  tokenType: TokenType;

  // thời gian sống (tính bằng giây)
  expiresIn: number;

  // refresh token
  refreshToken?: string;
}

export interface CreateUserInput {
  // email
  email: string;

  // mật khẩu đã hash
  password: string;
}

export interface CreateUserResult {
  // Id
  id: string;

  // email
  email: string;

  // thời gian tạo
  createdDate: Date;

  // Thời gian cập nhật
  updatedDate: Date;
}

interface CurrentUserResult {
  // userid
  userId: string;

  // email
  email: string;

  // sessionId
  sessionId: string;
}

export interface IUserService extends IBaseService {
  grantToken(
    payload: GrantTokenUserInput
  ): Promise<ResponseBase<GrantTokenUserResult>>;

  // tạo user
  create(payload: CreateUserInput): Promise<ResponseBase<CreateUserResult>>;

  // lấy thông tin user hiện tại
  getCurrentUser(tokenInfo: TokenInfo): Promise<CurrentUserResult>;
}

export class UserService implements IUserService {
  private _userRepo: IUserRepository | null;

  constructor(userRepo: IUserRepository) {
    this._userRepo = userRepo;
  }

  async dispose(): Promise<void> {
    const _this = this;
    if (_this._userRepo) {
      _this._userRepo = null;
    }
  }

  private async grantTokenByPassword(
    payload: GrantTokenUserInput
  ): Promise<ResponseBase<GrantTokenUserResult>> {
    const _this = this;
    let userEntity = await _this._userRepo?.findByEmail(payload.username!);
    if (
      !userEntity ||
      !(await _this._userRepo?.verifyPassword(userEntity, payload.password!))
    ) {
      return {
        success: false,
        code: responseInfo.code.grantToken.usernamePasswordInvalid,
        message: "Username hoặc password không hợp lệ",
      };
    }
    let accessToken = await generateToken();
    let tokenInfo: TokenInfo = {
      userId: userEntity._id,
      email: userEntity.email,
      sessionId: crypto.randomUUID().toString(),
    };
    await redisDbContext.set(
      await getTokenCacheKey(accessToken),
      tokenInfo,
      3600
    );

    let refreshToken = await generateToken();
    await redisDbContext.set(
      await getRefreshTokenCacheKey(refreshToken),
      userEntity._id,
      1296000
    );
    return {
      success: true,
      data: {
        accessToken: accessToken,
        tokenType: TokenType.Bearer,
        expiresIn: 3600,
        refreshToken: refreshToken,
      },
    };
  }

  private async grantTokenByRefreshToken(
    payload: GrantTokenUserInput
  ): Promise<ResponseBase<GrantTokenUserResult>> {
    const _this = this;
    let userId = await redisDbContext.get<string>(
      await getRefreshTokenCacheKey(payload.refreshToken!)
    );
    if (!userId) {
      return {
        success: false,
        code: responseInfo.code.grantToken.refreshTokenInvalid,
        message: "refresh_token không hợp lệ",
      };
    }
    let userEntity = await _this._userRepo?.findById(userId);
    if (!userEntity) {
      return {
        success: false,
        code: responseInfo.code.grantToken.refreshTokenInvalid,
        message: "refresh_token không hợp lệ",
      };
    }
    let accessToken = await generateToken();
    let tokenInfo: TokenInfo = {
      userId: userEntity._id,
      email: userEntity.email,
      sessionId: crypto.randomUUID().toString(),
    };
    await redisDbContext.set(
      await getTokenCacheKey(accessToken),
      tokenInfo,
      3600
    );
    return {
      success: true,
      data: {
        accessToken: accessToken,
        tokenType: TokenType.Bearer,
        expiresIn: 3600,
      },
    };
  }

  // hàm grant token
  async grantToken(
    payload: GrantTokenUserInput
  ): Promise<ResponseBase<GrantTokenUserResult>> {
    const _this = this;
    switch (payload.grantType) {
      case GrantTokenType.Password:
        return await _this.grantTokenByPassword(payload);
      case GrantTokenType.RefreshToken:
        return await _this.grantTokenByRefreshToken(payload);
      default:
        return {
          success: false,
          code: responseInfo.code.grantToken.notSupported,
          message: "grantType không hỗ trợ",
        };
    }
  }

  // tạo user
  async create(
    payload: CreateUserInput
  ): Promise<ResponseBase<CreateUserResult>> {
    const _this = this;
    let user: UserEntity = {
      _id: crypto.randomUUID().toString(),
      email: payload.email,
      passwordHashed: "",
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    user.passwordHashed =
      (await _this._userRepo?.hashPassword(payload.password)) || "";
    await _this._userRepo?.insert(user);
    return {
      success: true,
      data: {
        id: user._id,
        email: user.email,
        createdDate: user.createdDate,
        updatedDate: user.updatedDate,
      },
    };
  }

  // lấy thông tin user hiện tại
  async getCurrentUser(tokenInfo: TokenInfo): Promise<CurrentUserResult> {
    return {
      userId: tokenInfo.userId,
      email: tokenInfo.email,
      sessionId: tokenInfo.sessionId,
    };
  }
}
