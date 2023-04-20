import { Router } from "express";
import OfferController from "../controllers/offerController";
import CreateOfferSchema from "./validators/createOffer";
import validator from "./validators/validator";

const offer: Router = Router();
const controller = new OfferController();

offer.post("/", CreateOfferSchema, validator, controller.createOffer);

export default offer;
