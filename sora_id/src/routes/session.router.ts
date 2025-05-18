import { UserController } from "@/controllers/user.controller";
import express, { Request, Response } from "express";

const sessionRouter = express.Router();

sessionRouter.post("/", async (req: Request, res: Response) => {
  let userController = UserController.createInstance();
  try {
    await userController.grantToken(req, res);
  } finally {
    await userController.dispose();
  }
});

export default sessionRouter;
