import mongoose, { Schema } from "mongoose";

interface TokenType {
  userId: mongoose.Schema.Types.ObjectId;
  userName: string;
  password: string;
  gender: string;
  profilePhoto: string;
}

export { TokenType };
