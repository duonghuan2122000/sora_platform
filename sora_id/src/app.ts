import express, { Request, Response } from "express";
import sessionRouter from "@/routes/session.router";
import { HealthzController } from "./controllers/healthz.controller";
import userRouter from "@/routes/user.router";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get("/healthz", async (req: Request, res: Response) => {
  let healthzController = HealthzController.createInstance();
  try {
    await healthzController.checkHealthz(req, res);
  } finally {
    await healthzController.dispose();
  }
});

app.use("/session", sessionRouter);
app.use("/users", userRouter);

export default app;
