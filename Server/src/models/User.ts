import mongoose, { Schema, Document } from "mongoose";

interface UserSchemaTypes extends Document {
  username: string;
  email: string;
  password: string;
  profilePhoto: string;
  gender: string;
}

const UserSchema = new Schema<UserSchemaTypes>(
  {
    username: {
      type: String,
      required: [true, "please input you username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please input you email"],
      unique: true,
    },
    password: { type: String, required: [true, "please input you password"] },
    profilePhoto: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "please input you gender"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserSchemaTypes>("User", UserSchema);

export default User;
