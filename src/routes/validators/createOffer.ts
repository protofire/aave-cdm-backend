import { checkSchema } from "express-validator";

const CreateOfferSchema = checkSchema({
  address: {
    isString: true,
  },
  amount: {
    isString: true,
  },
  rate: {
    isNumeric: true,
  },
  duration: {
    isInt: true,
  },
  type: {
    isInt: true,
  },
  status: {
    isInt: true,
  },
  signedMessage: {
    isString: true,
    optional: true,
  },
});

export default CreateOfferSchema;
