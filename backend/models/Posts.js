import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const PostSchema = new mongoose.Schema({
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
});


PostSchema.plugin(AutoIncrement, { inc_field: 'postId' }); 

const Post = mongoose.model("Post", PostSchema);
export {Post};