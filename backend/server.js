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
  import { create_post }from './controller/create_post.js';  
  import { delete_post }from './controller/delete_post.js';  
  import { get_user_posts } from './controller/get_user_posts.js';
  import { fetch_users } from './controller/get_users.js';
  import { fetch_friends_request } from './controller/HandleFriends/get_friends_request.js';
  import { get_wallpaper } from './controller/get_wallpaper.js';
  import { post_friend_request } from './controller/HandleFriends/post_friend_req.js';
  import { Messenger } from './controller/Messanger.js';
  import { handleLikes } from './controller/handle_likes.js';
  import { fetch_messages } from "./controller/get_messages.js"
  import { get_accepted_friend } from './controller/HandleFriends/get_accepted_friends.js';
  import jwt from 'jsonwebtoken';
  import { accept_friends } from './controller/HandleFriends/post_accepted_friend.js';
  import {post_wallpaper} from './controller/post_wallpaper.js';
  import initializeSocket from './controller/socketController.js'
  import { Server } from 'socket.io'; 
  import http from 'http'; 

  const app = express(); 
  dotenv.config(); 
  app.use(express.json()); 
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  const PORT = process.env.PORT || 6001; 
  const server = http.createServer(app); 
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
  });
  mongoose.connect(process.env.MONGO_URL) 
    .then(() => {     
      initializeSocket(io);
      server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
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

  // Auth routes
  app.post('/api/auth/signup', upload.single('image'), signUp);
  app.post('/api/auth/login', upload.none(), login);
  // Post routes
  app.post('/api/posts', upload.single('image'), create_post);
  app.delete('/api/delete/post/:postID', authenticateToken, delete_post);
  app.get('/api/get/user/posts', authenticateToken, get_user_posts);
  app.post('/api/like/post',authenticateToken ,handleLikes); 
  // WALLPAPER routes
  app.get('/Profile/wallpaper', authenticateToken, get_wallpaper);
  app.post("/profilepic", upload.single("image"), post_wallpaper )
  // Users routes
  app.get('/api/search/users', authenticateToken, fetch_users);
  // Firends routes
  app.get('/api/get/friends', authenticateToken, fetch_friends_request);
  app.get('/api/acceptedfriends', authenticateToken, get_accepted_friend);
  app.post('/api/friendrequest', authenticateToken, post_friend_request);
  app.post('/api/accept_fiends', authenticateToken, accept_friends);
  // Messenager
  app.post('/Messenger',authenticateToken, Messenger)
  app.get(`/api/get/messages/:receiverId`, authenticateToken, fetch_messages);

