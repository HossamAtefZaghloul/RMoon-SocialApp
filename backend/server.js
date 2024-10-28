import express from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import path from 'path'; 
import mongoose from 'mongoose'; 
import multer from 'multer'; 
import fs from 'fs'; 
import { fileURLToPath } from 'url'; 
import { signUp } from './controller/handleSignup.js';  
import { login } from './controller/handleLogin.js';  
import { createPost }from './controller/handlePosts.js';  
import { deletePosts }from './controller/deletePosts.js';  
import { DisplayingPosts } from './controller/DisplayingPosts.js';
import { fetchUsers } from './controller/fetchUsers.js';
import { GetUsers } from './controller/GetUsers.js';

import {User} from "./models/User.js"
import jwt from 'jsonwebtoken';

const app = express(); 
dotenv.config(); 

app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:5173' })); 
const PORT = process.env.PORT || 6001; 
mongoose.connect(process.env.MONGO_URL) 
  .then(() => { 
    app.listen(PORT, () => console.log(`WORKING! http://localhost:${PORT}`)); 
  }) 
  .catch((error) => console.log(`${error} did not connect`)); 

  

// __dirname for ES6 
const filename = fileURLToPath(import.meta.url); 
const dirname = path.dirname(filename); 

// Ensure the 'public' folder exists 
const publicDir = path.join(dirname, 'public'); 
if (!fs.existsSync(publicDir)) { 
  fs.mkdirSync(publicDir, { recursive: true }); 
}
app.use('/public', express.static(path.join(dirname, 'public')));

// MULTER CONFIG 
  const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
     cb(null, publicDir); // Absolute path to 'public' 
  }, 

  filename: (req, file, cb) => { 
    cb(null, file.originalname); 
  } 

}); 


const upload = multer({ storage }); 

///
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Ensure token is passed in the Authorization header
``
  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' }); // Token not provided
  }

  const token = authHeader.split(' ')[1]; // Token is usually "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' }); // Token verification failed
    }

    // decodedToken contains the payload set during token generation
    req.user = decodedToken; // Attach user data to the request object
    next(); // Move to the next middleware or route handler
  });
};
// routess
app.post('/SignUp', upload.single('image'), signUp); 
app.post('/login',upload.none(), login);
app.post('/createpost',upload.single('image'), createPost);
app.get('/api/users', authenticateToken, fetchUsers);
app.get('/search/users', authenticateToken, GetUsers);
app.get('/api/users/me/posts', authenticateToken, DisplayingPosts);
app.delete('/Posts/:postID',deletePosts);

app.post("/profilepic", upload.single("image"), async (req, res) => {
  try {    
    const {userId } = req.body;
    console.log(userId)
    console.log("ghff")
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
});






