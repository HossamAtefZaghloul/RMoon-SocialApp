import { User } from '../models/User.js';

export const get_wallpaper = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Find the user and select only the profilePicture field
    const profilePicture = await User.findById(userId).select('profilePicture');
    
    if (!profilePicture) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log("aasdjadjasjdasjd919913913")
    // console.log(profilePicture)
    res.status(200).json(profilePicture);
  } catch (err) {
    console.error('Error fetching user profile picture:', err);
    res.status(500).json({ error: err.message });
  }
};
