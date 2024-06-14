import { Response, Request } from "express";
import { Message } from "../models/Messages.js";
import mongoose, { ObjectId } from "mongoose";
import ConversationModel from "../models/Conversation.js";
interface AuthRequest extends Request {
  id?: ObjectId;
}
const sendMessages = async (req: AuthRequest, res: Response) => {
  try {
    const senderId: mongoose.Types.ObjectId | undefined = req.id as
      | mongoose.Types.ObjectId
      | undefined;
    let receiverId: mongoose.Types.ObjectId | string = req.params.id as
      | mongoose.Types.ObjectId
      | string; // Create new ObjectId
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "please input userid or receiverId" });
    }
    console.log("............receiverId", receiverId);
    const { message } = req.body;
    // Find the ConversationModel
    let gotConversationModel = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversationModel) {
      gotConversationModel = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    console.log("create a message..........");
    const newMessage = await Message.create({
      receiverId,
      senderId,
      message,
    });
    console.log(".......newMessage", newMessage);
    if (newMessage) {
      gotConversationModel.messages.push(newMessage._id);
    }
    await Promise.all([gotConversationModel.save(), newMessage.save()]);
    // // SOCKET IO
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default sendMessages;
