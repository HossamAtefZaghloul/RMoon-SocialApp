import { Friends } from '../../models/Friends.js';

export const get_friend_req = async (req, res) => {
    const userId = req.user.userId;
    try {
      const friendsList = await Friends.find({
        $or: [{ requester: userId }, { recipient: userId }],
        status: 'pending',
      })
      .populate('requester', 'email username image')
      .populate('recipient', 'email username image');
      // console.log('3242343232342');
      // console.log(friendsList);
      res.status(200).json(friendsList);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Error fetching friends list" });
    }
};
