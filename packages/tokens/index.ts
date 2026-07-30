import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface JwtPayload {
  sub: string;                  // userId
  jti: string;                  // sessionId
}

export const hashPassword = async (password: string) => {
  const saltRounds = 13;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  password: string,
  passwordHash: string
) => {
  return bcrypt.compare(password, passwordHash);
};


export const generateAccessToken = async (
  payload: JwtPayload,
  accessTokenSecret: string
) => {
  try {
    return jwt.sign(payload, accessTokenSecret, {
      expiresIn: "15m",
    });
  } catch {
    throw new Error("Could not generate access token");
  }
};

export const generateRefreshToken = async (
  payload: JwtPayload,
  refreshTokenSecret: string
) => {
  try {
    return jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "7d",
    });
  } catch {
    throw new Error("Could not generate refresh token");
  }
};

export const verifyAccessToken = async (
  accessToken: string,
  accessTokenSecret: string
): Promise<JwtPayload> => {
  try {
    return jwt.verify(accessToken, accessTokenSecret) as JwtPayload;
  } catch {
    throw new Error("Could not verify access token");
  }
};

export const verifyRefreshToken = async (
  refreshToken: string,
  refreshTokenSecret: string
): Promise<JwtPayload> => {
  try {
    return jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload;
  } catch {
    throw new Error("Could not verify refresh token");
  }
};


export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};