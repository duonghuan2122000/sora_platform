import { redisDbContext } from "@/config/redis.connect";
import { TokenInfo } from "@/models/dtos/response.dto";
import { TokenType } from "@/models/enums/common.enum";
import { getTokenCacheKey } from "@/utils/token.util";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    tokenInfo?: TokenInfo;
    accessToken?: string;
  }
}

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers["authorization"]?.toString();
    if (!authHeader) {
      res.json(401).json();
      return;
    }
    let authSplit = authHeader.split(" ");
    if (!authSplit || authSplit.length != 2) {
      res.json(401).json();
      return;
    }
    let [tokenType, accessToken] = authSplit;
    if (tokenType != TokenType.Bearer) {
      res.json(401).json();
      return;
    }
    let tokenInfo = await redisDbContext.get<TokenInfo>(
      await getTokenCacheKey(accessToken)
    );
    if (!tokenInfo) {
      res.json(401).json();
      return;
    }
    req.accessToken = accessToken;
    req.tokenInfo = tokenInfo;
    next();
  };
};
