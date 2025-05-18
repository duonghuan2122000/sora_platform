import "module-alias/register";
import "dotenv/config";
import fs from "fs";
import app from "@/app";
import { createServer } from "http";
import { createServer as createServerHttps } from "https";
import logger from "@/loggers/default.logger";
import { timer } from "@/utils/timers.util";
import { mongoDbContext } from "@/config/mongo.connect";
import { redisDbContext } from "@/config/redis.connect";

async function run() {
  try {
    await redisDbContext.connect();
    await mongoDbContext.connect();
    const mode = process.env.MODE;
    let httpServer;
    if (mode !== "DEV") {
      httpServer = createServer(app);
    } else {
      httpServer = createServerHttps(
        {
          key: fs.readFileSync("./certs/key.pem"),
          cert: fs.readFileSync("./certs/cert.pem"),
        },
        app
      );
    }

    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
      logger.info(`app is running at ${timer().toISOString()}`);
    });
  } catch (error) {
    logger.error(error);
    await redisDbContext.dispose();
    await mongoDbContext.dispose();
  }
}

run();
