import mongoose, { Schema } from "mongoose";
const conversationModel = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
    message: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
}, { timestamps: true });
const ConversationModel = mongoose.model("Conversation", conversationModel);
export default ConversationModel;
