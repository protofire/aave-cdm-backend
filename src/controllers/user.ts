import { Request, Response } from "express";
import userService from "../services/user";

export default class UserController {
  public async generateRequestString(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { address } = req.params;
      const requestString = await userService.generateRequestString(address);
      return res.status(200).send(requestString);
    } catch (error) {
      return res.status(404).send({ error: "Not found" });
    }
  }

  public async verifyOwnership(req: Request, res: Response): Promise<Response> {
    try {
      const { address, message } = req.body;
      const isOwner = await userService.verifyOwnership(address, message);
      return res.status(200).send({ isOwner });
    } catch (error) {
      return res.status(400).send({ error: "BAD_REQUEST: Wrong signature!" });
    }
  }
}
