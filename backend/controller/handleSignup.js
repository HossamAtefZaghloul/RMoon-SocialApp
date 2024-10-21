import User1 from '../models/User1.js';
import bcrypt from 'bcrypt';

    export const signUp = async (req, res) => {
        try {
          const image =  req.file.path.substring(req.file.path.indexOf("public\\"));
          console.log("req.file: " + req.file.toString());
          const { email, password, username } = req.body;  
          const hashedPassword = await bcrypt.hash(password, 10);
          const checkEmail = await User1.findOne({ email });
          
          if (checkEmail) {
            return res.json("exist");
          } else {
            const newUser = new User1({
              email,
              password: hashedPassword, 
              username,
              image
          });
            await newUser.save(); 
            return res.status(200).json('newUser'); 
          }
        } catch (error) {
          res.status(500).json({ message: "Server error", error: error.message });
        }
      };