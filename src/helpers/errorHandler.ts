import { Response } from "express";
import CustomError from "./customError";
import { INTERNAL_ERROR } from "./constants";

export const handleError = (err: CustomError, res: Response) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message, data: null });
  }
  return res.status(500).send({ messsage: INTERNAL_ERROR, data: null });
};
