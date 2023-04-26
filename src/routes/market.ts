import { Router } from "express";
import MarketController from "../controllers/MarketController";

const market: Router = Router();
const controller = new MarketController();

market.get("/", controller.listMarkets);

export default market;
