import  { Post } from '../models/Posts.js';

export const delete_post = async (req, res) => {
  try { 
    const postID = req.params.postID;
    const result = await Post.findByIdAndDelete(postID);


 if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};