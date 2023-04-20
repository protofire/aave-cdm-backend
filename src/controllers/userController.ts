import { Request, Response } from "express";
import userService from "../services/user";
import { handleError } from "../helpers/errorHandler";
import { handleSuccess } from "../helpers/successHandler";
import CustomError from "../helpers/customError";

export default class UserController {
  /** TESTING PURPOSES */
  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.body;
      const user = await userService.createUser(address);
      return handleSuccess(user, res);
    } catch (error) {
      return handleError(error as CustomError, res);
    }
  }

  public async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.params;
      const requestString = await userService.authenticate(address);
      return handleSuccess(requestString, res);
    } catch (error) {
      return handleError(error as CustomError, res);
    }
  }
}
