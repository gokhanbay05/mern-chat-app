import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecipientSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { id: recipientId } = req.params;
    const senderId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Message text is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      conversationId: conversation._id,
      text: text,
    });

    await newMessage.save();

    const recipientSocketId = getRecipientSocketId(recipientId);
    if (recipientSocketId) {
      req.io.to(recipientSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
