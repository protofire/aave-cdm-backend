import { Response } from "express";

export const handleSuccess = (obj: any, res: Response) => {
  return res.status(200).send({ data: obj });
};
