import { Request, Response } from "express";
import offerService, { CreateOfferParams } from "../services/offer";
import { handleError } from "../helpers/errorHandler";
import CustomError from "../helpers/customError";
import { handleSuccess } from "../helpers/successHandler";

export default class OfferController {
  public async createOffer(req: Request, res: Response): Promise<Response> {
    try {
      const offerParams = req.body;
      console.log(offerParams);
      // const offer = offerService.createOffer(offerParams as CreateOfferParams);
      // return handleSuccess(offer, res);
      return res.status(200).send(true);
    } catch (error) {
      return handleError(error as CustomError, res);
    }
  }
}
