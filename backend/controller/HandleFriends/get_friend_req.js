import { Friends } from '../../models/Friends.js';

export const get_friend_req = async (req, res) => {
    const userId = req.user.userId;
    try {
      // Only fetch requests where the user is the recipient and requester is different
      const friendsList = await Friends.find({
        recipient: userId,
        requester: { $ne: userId },  // Excludes requests sent by the user
        status: 'pending',
      })
      .populate('requester', 'email username image')
      .populate('recipient', 'email username image');

      res.status(200).json(friendsList);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Error fetching friends list" });
    }
};
