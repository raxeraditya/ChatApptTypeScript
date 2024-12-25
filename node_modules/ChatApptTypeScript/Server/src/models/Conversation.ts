import mongoose, { Schema } from "mongoose";
import { Document, Types } from "mongoose";

export interface ConversationDocument extends Document {
  participants: Types.ObjectId[]; // Array of participant IDs
  messages: Types.ObjectId[]; // Array of message IDs
}

const conversationModel = new Schema<ConversationDocument>(
  {
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
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationModel);
export default ConversationModel;
