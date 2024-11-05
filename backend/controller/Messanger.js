import mongoose from 'mongoose';
import { Message } from '../models/Message.js';

export const Messenger = async (req, res) => {
  const { sender, receiverId, message } = req.body;
  if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({ message: "Invalid sender or receiver ID" });
  }
  try {
    const newMessage = new Message({
      sender,
      receiver:receiverId,
      content: message, 
    });
    const savedMessage = await newMessage.save();

    // io
    io.to(receiverId).emit("receiveMessage", {
      sender,
      content: message,
    });

    console.log('res:', savedMessage);
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: "Error saving message", error });
  }
};
