import { Router } from "express";
import UserController from "../controllers/userController";

const user: Router = Router();
const controller = new UserController();

user.get("/authenticate/:address", controller.authenticate);

/** TESTING PURPOSES */
user.post("/", controller.createUser);

export default user;
