import mongoose, { Schema } from "mongoose";

interface TokenType {
  userId: mongoose.Schema.Types.ObjectId;
  userName: string;
}

export { TokenType };
