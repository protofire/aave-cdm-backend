import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface Offer {
  amount: string;
  token: string;
  rate: number;
  duration: number;
  type: number;
  status: number;
  createdBy: ObjectId;
}

export interface OfferModelInterface extends Offer, mongoose.Document {}

const offerSchema = new mongoose.Schema({
  amount: { type: String },
  token: { type: String, index: true },
  rate: { type: Number },
  duration: { type: Number, index: true },
  type: { type: Number, index: true },
  status: { type: Number, index: true },
  createdBy: { type: ObjectId },
});

offerSchema.index({ token: 1, type: 1 });

const offerModel: mongoose.Model<OfferModelInterface> =
  mongoose.model<OfferModelInterface>("offer", offerSchema);

export default offerModel;
