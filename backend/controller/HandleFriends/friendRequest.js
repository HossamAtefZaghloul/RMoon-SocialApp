import mongoose from 'mongoose';
import { Friends } from '../../models/Friends.js';

export const handle_friend_request = async (req, res) => {
  const { userA, userB } = req.body;
  // console.log(userA)
  // console.log(userB)
  if (!mongoose.Types.ObjectId.isValid(userA) || !mongoose.Types.ObjectId.isValid(userB)) {
    return res.status(400).json({ message: "Invalid user IDs" });
  }

  try {
    const friendRequest = new Friends({
      requester: userA, 
      recipient: userB, 
      status: 'pending'
    });

    const savedRequest = await friendRequest.save();
    res.status(201).json(savedRequest); 
  } catch (error) {
    console.error("Error creating friend request:", error);
    res.status(500).json({ message: "Error creating friend request", error });
  }
};
