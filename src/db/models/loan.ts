import { ObjectId } from "mongodb";
import mongoose, { mongo } from "mongoose";

export interface Loan {
  contractUrl: string;
  offerId: ObjectId;
  status: number;
  borrower: string;
}

export interface LoanModelInterface extends Loan, mongoose.Document {}

const loanSchema = new mongoose.Schema({
  contractUrl: { type: String },
  offerId: { type: ObjectId },
  status: { type: Number, index: true },
  borrower: { type: String, index: true },
});

const loanModel: mongoose.Model<LoanModelInterface> =
  mongoose.model<LoanModelInterface>("offer", loanSchema);

export default loanModel;
