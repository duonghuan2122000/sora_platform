import { UserController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {
  let userController = UserController.createInstance();
  try {
    await userController.create(req, res);
  } finally {
    await userController.dispose();
  }
});

userRouter.get("/cu", authMiddleware(), async (req: Request, res: Response) => {
  let userController = UserController.createInstance();
  try {
    await userController.getCurrentUser(req, res);
  } finally {
    await userController.dispose();
  }
});

export default userRouter;
