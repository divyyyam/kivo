import pino, { type Logger, type LoggerOptions } from "pino";

export type CreateLoggerOptions = {
  name?: string;
  level?: string;
  pretty?: boolean;
  base?: Record<string, unknown>;
};

export function createLogger({
  name,
  level = process.env.LOG_LEVEL ?? "info",
  pretty = process.env.NODE_ENV !== "production",
  base,
}: CreateLoggerOptions = {}): Logger {
  const options: LoggerOptions = {
    name,
    level,
    base,
    redact: {
      paths: [
        "password",
        "tokens",
        "accessToken",
        "refreshToken",
        "authorization",
        "req.headers.authorization",
      ],
      censor: "[REDACTED]",
    },
  };
  if (!pretty) {
    return pino(options);
  }
  return pino(
    options,
    pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        singleLine: true,
        ignore: "pid,hostname",
      },
    }),
  );
}
