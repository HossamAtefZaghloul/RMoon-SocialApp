import User1 from '../models/User1.js'; 

export const posts = async (req, res) => {
    try {
        const image =  req.file.path.substring(req.file.path.indexOf("public\\"));
        const { content, userId } = req.body; 
        console.log(content,userId,image)
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newPost = { content, image };
        console.log('ss')
        // Update the user with the new post
        const updatedUser = await User1.findOneAndUpdate(
            { userId: userId },  // Match based on the custom userId field
            { $push: { "posts": newPost } },  // Push new post into posts array
            { new: true }  // Return the updated document
        );
        console.log('ss')

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json('newPost'); 
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};