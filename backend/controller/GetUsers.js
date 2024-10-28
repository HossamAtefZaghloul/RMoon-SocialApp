import { User } from '../models/User.js';

export const GetUsers = async (req, res) => {
  try {
    const users = await User.find();


    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};