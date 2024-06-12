import { transports, format, createLogger } from "winston";

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const requestLogger = createLogger({
  transports: [
    new transports.File({
      level: "warn",
      filename: "logs/logsWarning.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/logsError.log",
    }),
    new transports.File({
      level: "info",
      filename: "logs/logsInfo.log",
    }),
  ],
  format: format.combine(
    format.errors({ error: true }),
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
});

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "logs/logs.log",
    }),
  ],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
    myFormat
  ),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export { requestLogger, logger };
