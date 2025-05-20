import { randomBytes } from "crypto";

export const generateToken = async () => {
  const buf = randomBytes(24);
  return buf.toString("base64url");
};

export const getTokenCacheKey = async (accessToken: string) => {
  return `accessToken:${accessToken}`;
};

export const getRefreshTokenCacheKey = async (refreshToken: string) => {
  return `refreshToken:${refreshToken}`;
};

export const getSessionCookieName = async () => {
  return `x-sora-sessionid`;
};
