import  { User } from '../models/User.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const { email, password } = req.body; 
    console.log('User data received:', { email, password });

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.json("InvalidEmail");
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json("InvalidPassword");
        }
      

        
        const tokenData = {
            time: Date(),
            userId: user._id
        };

        const token = jwt.sign(tokenData, jwtSecretKey, { expiresIn: '1h' });

     
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username, 
                image: user.image,
                userId: user.UserId,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.error("Server error:", error);  
        res.status(500).json({ message: 'Server error' });
    }
};