import { Router } from "express";
import LoanController from "../controllers/LoanController";

const loan: Router = Router();
const controller = new LoanController();

loan.get("/requests/:address", controller.getUserLoanRequest);
loan.get("/:address", controller.getUserLoans);

export default loan;
