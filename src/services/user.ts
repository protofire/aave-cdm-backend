import { v1 } from "uuid";
import {
  INVALID_MESSAGE_ERROR,
  REQUEST_STRING,
  USER_NOT_FOUND_ERROR,
} from "../helpers/constants";
import userModel from "../db/models/user";
import { ethers } from "ethers";
import CustomError from "../helpers/customError";

const authenticate = async (address: string) => {
  const foundUser = await userModel.findOne({ address });
  if (foundUser) {
    return foundUser.requestString;
  }
  await createUser(address);
  return generateRequestString(address);
};

const generateRequestString = async (address: string) => {
  const user = await userModel.findOne({ address });
  if (!user) throw new CustomError(404, USER_NOT_FOUND_ERROR);
  const requestString = `${REQUEST_STRING} \n ${v1()}`;
  user.requestString = requestString;
  await user.save();
  return requestString;
};

const verifyOwnership = async (address: string, message: string) => {
  const user = await userModel.findOne({ address });
  if (!user) throw new CustomError(404, USER_NOT_FOUND_ERROR);
  if (ethers.recoverAddress(user.requestString, message) !== address) {
    throw new CustomError(400, INVALID_MESSAGE_ERROR);
  }
  return true;
};

const createUser = async (address: string) => {
  try {
    const user = await userModel.create({ address });
    return user;
  } catch (error) {
    // @ts-ignore: Unreachable code error
    if (error?.code === 11000) {
      throw new CustomError(409, "Wallet address alredy registred");
    }
    throw error;
  }
};

export default {
  generateRequestString,
  verifyOwnership,
  createUser,
  authenticate,
};
