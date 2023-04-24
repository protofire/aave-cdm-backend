import { Router } from "express";
import loan from "./loan";

const routes = Router();

routes.use("/loan", loan);

export default routes;
