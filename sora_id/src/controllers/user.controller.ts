import {
  CreateUserInput,
  GrantTokenUserInput,
  IUserService,
  UserService,
} from "@/services/user.service";
import { Request, Response } from "express";
import { IBaseController } from "./base.controller";
import UserRepository from "@/repositories/user.repository";
import { mongoDbContext } from "@/config/mongo.connect";

export interface IUserController extends IBaseController {
  // grant token
  grantToken(req: Request, res: Response): Promise<void>;

  // tạo user
  create(req: Request, res: Response): Promise<void>;

  // lấy thông tin user hiện tại
  getCurrentUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements IUserController {
  private _userService: IUserService | null;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  async dispose(): Promise<void> {
    const _this = this;
    if (_this._userService) {
      _this._userService = null;
    }
  }

  static createInstance(): IUserController {
    let userRepo = new UserRepository(mongoDbContext);
    let userService = new UserService(userRepo);
    return new UserController(userService);
  }

  // grant token
  async grantToken(req: Request, res: Response): Promise<void> {
    const _this = this;
    let payload = req.body as GrantTokenUserInput;
    res.status(200).json(await _this._userService?.grantToken(payload));
  }

  // tạo user
  async create(req: Request, res: Response): Promise<void> {
    const _this = this;
    let payload = req.body as CreateUserInput;
    res.status(200).json(await _this._userService?.create(payload));
  }

  // lấy thông tin user hiện tại
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    const _this = this;
    res
      .status(200)
      .json(await _this._userService?.getCurrentUser(req.tokenInfo!));
  }
}
