import {User} from "../models/User.js"

export const post_wallpaper = async (req, res) => {
    try {    
      const {userId } = req.body;
      // console.log(userId)
      // console.log("ghff")
      const image = req.file.path.substring(req.file.path.indexOf("public\\"));
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: image}, 
        { new: true } 
      );
  
      res.status(200).json(updatedUser.
        profilePicture);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile picture", error });
    }
  };