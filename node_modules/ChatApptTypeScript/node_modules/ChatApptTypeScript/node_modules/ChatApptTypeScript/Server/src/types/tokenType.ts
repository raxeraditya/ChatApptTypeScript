import mongoose, { Schema } from "mongoose";

export interface TokenType {
  userId: mongoose.Types.ObjectId;
  userName: string;
  profilePhoto?: string;
  email: string;
  gender?: string;
}
