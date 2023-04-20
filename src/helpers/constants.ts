export const REQUEST_STRING =
  "This is a verification message. Please sign it with your wallet to verift ownership";

export enum OFFER_STATUS {
  "Open" = 0,
  "Archived" = 1,
  "Closed" = 2,
}

export enum OFFER_TYPE {
  "OpenLaw" = 0,
}

export const INTERNAL_ERROR = "Internal server error";
export const INVALID_MESSAGE_ERROR = "INVALID_MESSAGE: Invalid signed message";
export const USER_NOT_FOUND_ERROR = "NOT_FOUND: User not found";
export const UNAUTHORIZED_ADDRESS_ERROR =
  "UNAUTHORIZED_ADDRESS: Failed to authenticate address";
