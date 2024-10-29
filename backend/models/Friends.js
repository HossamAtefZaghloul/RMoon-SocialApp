import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose; 

const FriendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

FriendsSchema.plugin(AutoIncrement, { inc_field: 'FriendsId' });

const Friends = mongoose.model("Friends", FriendsSchema);

export { Friends };
