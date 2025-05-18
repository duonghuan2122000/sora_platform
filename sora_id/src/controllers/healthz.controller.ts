import { IBaseController } from "./base.controller";
import { Request, Response } from "express";

interface IHealthzController extends IBaseController {
  checkHealthz(req: Request, res: Response): Promise<void>;
}

export class HealthzController implements IHealthzController {
  constructor() {}

  async dispose(): Promise<void> {}

  static createInstance(): IHealthzController {
    return new HealthzController();
  }

  async checkHealthz(_: Request, res: Response): Promise<void> {
    res.status(200).json({
      code: 200,
      message: "Service is active",
    });
  }
}
