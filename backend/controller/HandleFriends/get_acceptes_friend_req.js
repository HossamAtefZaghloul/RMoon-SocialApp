import { Friends } from '../../models/Friends.js';

export const get_acceptes_friend_req = async (req, res) => {
    const userId = req.user.userId;
    try {
      const friendsList = await Friends.find({
        $or: [
          { requester: userId },  // Friend requests sent by the user and accepted
          { recipient: userId }    // Friend requests received by the user and accepted
        ]
      })
      .populate('requester', 'email username image')
      .populate('recipient', 'email username image');

      res.status(200).json(friendsList);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Error fetching friends list" });
    }
};
