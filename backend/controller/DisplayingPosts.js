import User1 from '../models/User1.js';

export const DisplayingPosts = (req, res) => {
  const userId = req.user.userId;

  // console.log("User ID: " + userId); 

  User1.findOne({ userId }) 
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); 
      }
      res.json(user.posts); 
    })
    .catch(err => {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: err.message });
    });
};