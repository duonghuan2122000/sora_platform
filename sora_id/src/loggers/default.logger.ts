import pino, { transport } from "pino";
import path from "path";
import fs from "fs";
import { timer } from "@/utils/timers.util";
const rfs = require("rotating-file-stream");
const { Writable } = require("stream");

const logDirectory = path.join(__dirname, "..", "..", "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Tạo stream ghi log theo ngày
const fileStream = rfs.createStream(
  (time: string | number | Date, index: any) => {
    let date = timer();
    if (time) {
      date = timer(time);
    }
    return `app-${date.format("YYYYMMDD")}.log`;
  },
  {
    interval: "1d", // Xoay log mỗi ngày
    path: logDirectory,
    compress: "gzip", // Nén các file log cũ
    maxFiles: 14, // Giữ lại các file log trong 14 ngày
  }
);

const fileWritable = new Writable({
  write(chunk: any, encoding: any, callback: any) {
    try {
      const log = JSON.parse(chunk.toString());

      const formatted = `{"level":${log.level},"time":"${timer(
        log.time
      ).toISOString()}","pid":${log.pid},"hostname":"${log.hostname}","msg":"${
        log.msg
      }"}\n`;

      fileStream.write(formatted);
      callback();
    } catch (err) {
      console.error("⚠️ Log parse error:", err);
      callback(err);
    }
  },
});

const logger = pino(
  {
    level: "info",
  },
  pino.multistream([
    { stream: fileWritable },
    {
      stream: pino.transport({
        target: "pino-pretty",
      }),
    },
  ])
);

export default logger;
