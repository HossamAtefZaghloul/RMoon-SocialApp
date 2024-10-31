import { User } from '../models/User.js';

export const get_user = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};