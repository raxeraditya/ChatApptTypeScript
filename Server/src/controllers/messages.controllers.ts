import { Response, Request } from "express";
import { Message } from "../models/Messages.js";
import mongoose, { ObjectId } from "mongoose";
import ConversationModel from "../models/Conversation.js";
import { MessageZod } from "../types/zodTypes.js";
interface AuthRequest extends Request {
  id?: ObjectId;
}
const sendMessages = async (req: AuthRequest, res: Response) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    // Create new ObjectId
    if (!senderId && !receiverId) {
      return res
        .status(400)
        .json({ message: "please input userid or receiverId" });
    }
    console.log("............receiverId", receiverId);
    const data = req.body;
    const parsedInput = MessageZod.safeParse(data);
    if (!parsedInput.success) {
      const data1 = parsedInput.error.formErrors;
      console.log(data1);
      return res
        .status(400)
        .json({ message: "please input message than send it", data: data1 });
    }
    const { message } = data;
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
    return res
      .status(500)
      .json({ message: "Internal server error in Message Controllers" });
  }
};

export default sendMessages;
