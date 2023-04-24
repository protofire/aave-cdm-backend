import { Request, Response } from "express";
import { getUserLoanRequest } from "../services/atomica";

export default class LoanController {
  public async getUserLoans(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.params;
      const loans = await getUserLoanRequest(address);
      return res.status(200).send({ loans });
    } catch (error) {
      return res.status(400).send({ message: "BAD" });
    }
  }
}
