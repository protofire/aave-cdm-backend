import { Request, Response } from "express";
import { listMarkets } from "../services/atomica";

export default class MarketController {
  public async listMarkets({
    res,
  }: {
    req: Request;
    res: Response;
  }): Promise<Response> {
    try {
      const markets = await listMarkets();
      return res.status(200).send(markets);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "INTERNAL_ERROR" });
    }
  }
}
