import mongoose from "mongoose";

interface loginUser {
  username: string;
  password: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

interface AuthRequest extends Request {
  id?: mongoose.Schema.Types.ObjectId; // Define the id property
}

export { loginUser, UserData, AuthRequest };
