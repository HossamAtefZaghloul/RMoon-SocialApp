import mongoose from 'mongoose';
import { Friends } from '../../models/Friends.js';

export const accept_friends = async (req, res) => {
  try {
    const { friendRequestID } = req.body; 
    // console.log('91329183128389')
    console.log(friendRequestID)

    if (!mongoose.Types.ObjectId.isValid(friendRequestID)) {
      return res.status(400).json({ message: "Invalid Friend ID" });
    }

    const friend_accepted = await Friends.findByIdAndUpdate(
      friendRequestID,
      { status: 'accepted' }, 
      { new: true }
    );

    if (!friend_accepted) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    res.status(200).json({ message: "Friend request not found", friend_accepted });

  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Error accepting friend request", error });
  }
};
