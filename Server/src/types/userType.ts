import { Request } from "express";
import mongoose from "mongoose";

interface loginUserDataType {
  username: string;
  email:string;
  password: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface AuthRequest extends Request {
  id?: mongoose.Types.ObjectId; // Define the id property
}

export { loginUserDataType, UserData };
