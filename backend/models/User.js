import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
    profilePicture: { type: String, default: "path/to/default/profile/pic.jpg" } 
});
UserSchema.plugin(AutoIncrement, { inc_field: 'UserId' }); 

const User = mongoose.model("User", UserSchema);

export {User} ;