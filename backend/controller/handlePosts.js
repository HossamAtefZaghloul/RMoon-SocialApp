import {User} from '../models/User.js'; 
import {Post} from '../models/Posts.js';

export const createPost = async (req, res) => {
    try {
        const image = req.file ? req.file.path.substring(req.file.path.indexOf("public\\")) : null;
        const { content, userId, timeAgo } = req.body;
        
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = new Post({
            user: userId,
            content: content,
            timeAgo: timeAgo,
            image: image,
        });


        await post.save();
        // console.log('Post created');

        return res.json("New post created");
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
