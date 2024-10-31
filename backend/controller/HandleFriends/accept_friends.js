import mongoose from 'mongoose';
import { Friends } from '../../models/Friends.js';

export const accept_friends = async (req, res) => {
  try {
    const { friend_req_id } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(friend_req_id)) {
      return res.status(400).json({ message: "Invalid Friend ID" });
    }

    const friend_accepted = await Friends.findByIdAndUpdate(
      friend_req_id,
      { status: 'accepted' }, 
      { new: true }
    );

    if (!friend_accepted) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    res.status(200).json(friend_accepted);

  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Error accepting friend request", error });
  }
};
