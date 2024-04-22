import mongoose, { Schema } from "mongoose";
const MessageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recieverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
