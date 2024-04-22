import mongoose, { Schema } from "mongoose";

interface ConversationTypes extends Document {
  participants: Schema.Types.ObjectId;
  message: Schema.Types.ObjectId;
}

const conversationModel = new Schema<ConversationTypes>(
  {
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
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationModel);

export default ConversationModel;
