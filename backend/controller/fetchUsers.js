import { User } from '../models/User.js';

export const fetchUsers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const users = await User.find({ _id: { $ne: userId } });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};