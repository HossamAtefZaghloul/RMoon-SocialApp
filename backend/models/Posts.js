import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);
const { Schema } = mongoose; 

const PostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timeAgo: {
    type: String,
  },
  image: {
    type: String,
  },
  likeCount: {
    type: Number,
    default: 0,  // Initialize likeCount to 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference User model for each user who liked the post
  }]
});

PostSchema.plugin(AutoIncrement, { inc_field: 'postId' }); 

const Post = mongoose.model("Post", PostSchema);
export { Post };
