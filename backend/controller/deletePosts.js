import  { User } from '../models/User.js';

export const deletePosts = async (req, res) => {
  try { 
    const postID = req.postID;
    const deletedPost = await User1.Post.findByIdAndDelete(postID);


 if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};