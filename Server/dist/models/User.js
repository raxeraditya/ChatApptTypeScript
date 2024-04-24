import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
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
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);
export default User;
