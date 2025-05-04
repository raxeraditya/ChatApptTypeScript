import mongoose, { Schema } from "mongoose";

export interface TokenType {
  userId: mongoose.Types.ObjectId;
  userName: string;
  profilePhoto?: string;
  email: string;
  gender?: string;
}
// Define interface for the token data
interface TokenData {
  userId: string;
  userName: string;
  gender: string;
  email: string;
}

// Define the AuthResponse interface for consistent response types
export interface AuthResponse {
  message: string;
  token:string;
  tokendata?: TokenData;
  data?: any;
}

