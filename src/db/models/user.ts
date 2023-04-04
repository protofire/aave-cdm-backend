import mongoose from "mongoose";

export interface User {
  address: string;
  requestString: string;
}

export interface UserModelInterface extends User, mongoose.Document {}

const userSchema = new mongoose.Schema({
  address: { type: String, unique: true },
  requestString: { type: String },
});

const userModel: mongoose.Model<UserModelInterface> =
  mongoose.model<UserModelInterface>("user", userSchema);

export default userModel;
