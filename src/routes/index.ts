import { Router } from "express";
import loan from "./loan";
import market from "./market";

const routes = Router();

routes.use("/loan", loan);
routes.use("/market", market);

export default routes;
