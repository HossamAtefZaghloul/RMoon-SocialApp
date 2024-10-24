import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Pass mongoose to the mongoose-sequence plugin
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
    posts: [{
        content: {
            type :String
       },
       timeAgo: {
            type: String,
      },
       image: {
            type: String,
  },
    }],
});

// Apply the AutoIncrement plugin to your schema
UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User1 = mongoose.model("User1", UserSchema);
export default User1;