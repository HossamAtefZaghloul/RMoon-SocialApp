import { Post } from '../models/Posts.js';

export const handleLikes = async (req, res) => {
  try {
    const { postid, userId } = req.body;
    console.log(postid)
    console.log(userId)

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likedBy.includes(userId);
    console.log(isLiked)
    const update = isLiked
      ? { $pull: { likedBy: userId }, $inc: { likeCount: -1 } }
      : { $addToSet: { likedBy: userId }, $inc: { likeCount: 1 } };
      console.log(update)
    const updatedPost = await Post.findByIdAndUpdate(postid, update, { new: true });
    
    res.status(200).json({ likeCount: updatedPost.likeCount, isLiked: !isLiked });
    console.log(updatedPost)
  } catch (error) {
    res.status(500).json({ message: "Error updating like count", error });
  }
};

