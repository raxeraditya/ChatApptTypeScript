import mongoose, { Schema } from "mongoose";
const conversationModel = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            required: true,
        },
    ],
}, { timestamps: true });
const ConversationModel = mongoose.model("Conversation", conversationModel);
export default ConversationModel;
