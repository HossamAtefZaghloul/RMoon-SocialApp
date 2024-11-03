import mongoose from 'mongoose';
import { Friends } from '../../models/Friends.js';

export const post_friend_request = async (req, res) => {
  const { userA, userB } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userA) || !mongoose.Types.ObjectId.isValid(userB)) {
    return res.status(400).json({ message: "Invalid user IDs" });
  }

  const existingFriendship = await Friends.findOne({
    $or: [
      { requester: userA, recipient: userB },
      { requester: userB, recipient: userA },
    ]
  });

  if (existingFriendship) {
    return res.status(400).json({ message: "Users are already friends or a request is pending" });
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
