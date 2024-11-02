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
import { get_friend_req } from './controller/HandleFriends/get_friend_req.js';
import { get_user } from './controller/get_user.js';
import { handle_friend_request } from './controller/HandleFriends/friendRequest.js';
import { get_acceptes_friend_req } from './controller/HandleFriends/get_acceptes_friend_req.js';
import jwt from 'jsonwebtoken';
import { accept_friends } from './controller/HandleFriends/accept_friends.js';
import {profile_image}from './controller/profile_image.js';
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
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' }); 
    }

    req.user = decodedToken;
    next(); 
  });
};
// routess
app.post('/SignUp', upload.single('image'), signUp); 
app.post('/login',upload.none(), login);
app.post('/createpost',upload.single('image'), createPost);
app.get('/api/users', authenticateToken, fetchUsers);
app.get('/search/users', authenticateToken, GetUsers);
app.get('/api/users/me/posts', authenticateToken, DisplayingPosts);
app.get('/Profile/user', authenticateToken, get_user);
app.get('/getfriends', authenticateToken, get_friend_req);
app.get('/api/acceptedfriends', authenticateToken, get_acceptes_friend_req);
app.delete('/Posts/:postID',deletePosts);
app.post('/api/friendrequest', handle_friend_request);
app.post('/api/accept_fiends', accept_friends)
app.post("/profilepic", upload.single("image"),profile_image )






