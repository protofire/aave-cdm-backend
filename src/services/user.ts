import { v1 } from "uuid";
import { REQUEST_STRING } from "../helpers/constants";
import userModel from "../db/models/user";
import { ethers } from "ethers";

const generateRequestString = async (address: string) => {
  const user = await findUserByAddress(address);
  const requestString = `${REQUEST_STRING} \n${v1()}`;
  user.requestString = requestString;
  await user.save();
  return requestString;
};

const verifyOwnership = async (address: string, message: string) => {
  const user = await findUserByAddress(address);
  if (ethers.recoverAddress(user.requestString, message) !== address) {
    throw new Error();
  }
  return true;
};

const findUserByAddress = async (address: string) => {
  const user = await userModel.findOne({ address });
  if (!user) throw new Error();
  return user;
};

export default { generateRequestString, findUserByAddress, verifyOwnership };
