import "module-alias/register";
import "dotenv/config";
import app from "@/app";
import { createServer } from "http";
import logger from "@/loggers/default.logger";
import { timer } from "@/utils/timers.util";

const httpServer = createServer(app);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  logger.info(`app is running at ${timer().toISOString()}`);
});
