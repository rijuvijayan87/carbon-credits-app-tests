import pino from "pino";
import { config } from "../config/env";

const isCI = config.CI;

let logger: pino.Logger;

if (isCI) {
  // In CI: Use default JSON logging.
  logger = pino(
    {
      level: config.LOG_LEVEL.toLowerCase(),
      formatters: {
        level: (label) => ({ level: label }),
      },
    },
    pino.destination({ sync: true })
  );
} else {
  // Local: Use pino-pretty for more readable logs.
  logger = pino({
    level: config.LOG_LEVEL.toLowerCase(),
    transport: {
      target: "pino-pretty",
      options: { colorize: true, sync: true },
    },
  });
}

export { logger };
