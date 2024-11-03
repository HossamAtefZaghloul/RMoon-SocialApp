import { Post } from '../models/Posts.js';

export const get_user_posts = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log('983898932983')
    // console.log(userId)
    const posts = await Post.find({ user: userId });

    // Check if posts exist for the user
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }
    console.log(posts)
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: err.message });
  }
};