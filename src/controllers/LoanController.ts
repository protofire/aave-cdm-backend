import { Request, Response } from "express";
import { getUserLoanRequest, getUserLoans } from "../services/atomica";

export default class LoanController {
  public async getUserLoans(req: Request, res: Response): Promise<Response> {
    try {
      const { address } = req.params;
      const loans = await getUserLoans(address);
      return res.status(200).send(loans);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "BAD_REQUEST" });
    }
  }

  public async getUserLoanRequest(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { address } = req.params;
      const loansRequest = await getUserLoanRequest(address);
      return res.status(200).send({ loansRequest });
    } catch (error) {
      return res.status(400).send({ message: "BAD_REQUEST" });
    }
  }
}
