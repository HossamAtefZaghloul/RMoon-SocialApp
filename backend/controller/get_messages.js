import { Message } from '../models/Message.js';
import mongoose from 'mongoose';

export const fetch_messages = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { receiverId } = req.params;
    console.log(userId)
    console.log(receiverId)
    console.log("reterer4234234324324")

    if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: 'Invalid or missing receiver ID' });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }
    console.log(messages)

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Error fetching messages', error: err.message });
  }
};
