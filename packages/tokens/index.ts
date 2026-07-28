import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from "jsonwebtoken";

const DEFAULT_ACCESS_TOKEN_EXPIRY: SignOptions["expiresIn"] = "15m";
const DEFAULT_REFRESH_TOKEN_EXPIRY: SignOptions["expiresIn"] = "7d";
const DEFAULT_SALT_ROUNDS = 12;

export type TokenPayload = JwtPayload | string;

const getRequiredSecret = (names: string[]): Secret => {
  for (const name of names) {
    const value = process.env[name]?.trim();

    if (value) {
      return value;
    }
  }

  throw new Error(`Missing token secret. Set one of: ${names.join(", ")}.`);
};

const getExpiry = (
  names: string[],
  fallback: SignOptions["expiresIn"],
): SignOptions["expiresIn"] => {
  for (const name of names) {
    const value = process.env[name]?.trim();

    if (value) {
      return value as SignOptions["expiresIn"];
    }
  }

  return fallback;
};

const getSaltRounds = (): number => {
  const configuredRounds = process.env.BCRYPT_SALT_ROUNDS?.trim();

  if (!configuredRounds) {
    return DEFAULT_SALT_ROUNDS;
  }

  const rounds = Number(configuredRounds);

  if (!Number.isInteger(rounds) || rounds < 4 || rounds > 31) {
    throw new Error("BCRYPT_SALT_ROUNDS must be an integer from 4 to 31.");
  }

  return rounds;
};

const normalizePayload = (payload: TokenPayload): JwtPayload =>
  typeof payload === "string" ? { sub: payload } : payload;

const verifyToken = <T extends JwtPayload>(
  token: string,
  secret: Secret,
): T => {
  const payload = jwt.verify(token, secret);

  if (typeof payload === "string") {
    throw new jwt.JsonWebTokenError("Token payload must be an object.");
  }

  return payload as T;
};

export const generateAccessToken = async (
  payload: TokenPayload,
): Promise<string> => {
  const secret = getRequiredSecret([
    "ACCESS_TOKEN_SECRET",
    "JWT_ACCESS_SECRET",
  ]);
  const expiresIn = getExpiry(
    ["ACCESS_TOKEN_EXPIRES_IN", "ACCESS_TOKEN_EXPIRY"],
    DEFAULT_ACCESS_TOKEN_EXPIRY,
  );

  return jwt.sign(normalizePayload(payload), secret, { expiresIn });
};

export const verifyAccessToken = async <T extends JwtPayload = JwtPayload>(
  token: string,
): Promise<T> =>
  verifyToken<T>(
    token,
    getRequiredSecret(["ACCESS_TOKEN_SECRET", "JWT_ACCESS_SECRET"]),
  );

export const generateRefreshToken = async (
  payload: TokenPayload,
): Promise<string> => {
  const normalizedPayload = normalizePayload(payload);
  const secret = getRequiredSecret([
    "REFRESH_TOKEN_SECRET",
    "JWT_REFRESH_SECRET",
  ]);
  const expiresIn = getExpiry(
    ["REFRESH_TOKEN_EXPIRES_IN", "REFRESH_TOKEN_EXPIRY"],
    DEFAULT_REFRESH_TOKEN_EXPIRY,
  );
  const options: SignOptions = { expiresIn };

  if (!normalizedPayload.jti) {
    options.jwtid = crypto.randomUUID();
  }

  return jwt.sign(normalizedPayload, secret, options);
};

export const verifyRefreshToken = async <T extends JwtPayload = JwtPayload>(
  token: string,
): Promise<T> =>
  verifyToken<T>(
    token,
    getRequiredSecret(["REFRESH_TOKEN_SECRET", "JWT_REFRESH_SECRET"]),
  );

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, getSaltRounds());

export const verifyPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => bcrypt.compare(password, passwordHash);
