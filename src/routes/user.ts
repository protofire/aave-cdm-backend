import { Router } from "express";
import userService from "../services/user";
import UserController from "../controllers/user";

const user: Router = Router();
const controller = new UserController();

user.get("/request-string/:address", controller.generateRequestString);

user.post("/verify-ownership", controller.verifyOwnership);

export default user;
