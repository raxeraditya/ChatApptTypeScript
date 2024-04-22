import mongoose, { Schema, Document } from "mongoose";

interface MessageSchemaTypes extends Document {
  senderId: Schema.Types.ObjectId; // ID of the sender
  recieverId: Schema.Types.ObjectId; // ID of the conversation
  message: string;
}

const MessageSchema = new Schema<MessageSchemaTypes>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recieverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<MessageSchemaTypes>(
  "Message",
  MessageSchema
);

export default MessageModel;
