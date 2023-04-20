import { Router } from "express";
import user from "./user";
import offer from "./offer";

const routes = Router();

routes.use("/user", user);
routes.use("/offer", offer);

export default routes;
