import  { User } from '../models/User.js';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const image = req.file.path.substring(req.file.path.indexOf("public\\"));
    console.log("req.file: ", req.file); 

    const { email, password, username } = req.body;


    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const checkEmail = await User.findOne({ email }); 

    if (checkEmail) {
      return res.status(409).json({ message: "Email already exists." });
    } else {

      const newUser = new User({
        email,
        password: hashedPassword,
        username,
        image,
      });

      await newUser.save(); 
      return res.status(201).json({ message: "User created successfully." });
    }
  } catch (error) {
    console.error('Sign-up error:', error); 
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};