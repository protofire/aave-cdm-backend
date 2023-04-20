import offerModel from "../db/models/offer";
import {
  OFFER_STATUS,
  OFFER_TYPE,
  UNAUTHORIZED_ADDRESS_ERROR,
} from "../helpers/constants";
import CustomError from "../helpers/customError";
import userService from "./user";

export interface CreateOfferParams {
  amount: string;
  token: string;
  rate: number;
  duration: number;
  type: number;
  status: number;
  address: string;
  signedMessage?: string;
}

const createOffer = async (params: CreateOfferParams) => {
  const { address, signedMessage } = params;
  const isOwner = await userService.verifyOwnership(
    address,
    signedMessage || ""
  );
  if (!isOwner) throw new CustomError(401, UNAUTHORIZED_ADDRESS_ERROR);
  delete params.signedMessage;
  const offer = await offerModel.create({
    ...params,
    status: OFFER_STATUS[params.status],
    type: OFFER_TYPE[params.type],
    createdBy: params.address,
  });
  return offer;
};

export default { createOffer };
