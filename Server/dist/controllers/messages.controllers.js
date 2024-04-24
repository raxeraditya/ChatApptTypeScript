import { Message } from "../models/Messages.js";
import ConversationModel from "../models/Conversation.js";
const sendMessages = async (req, res) => {
    try {
        const senderId = req.id;
        let receiverId = req.params.id; // Create new ObjectId
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
    }
    catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export default sendMessages;
