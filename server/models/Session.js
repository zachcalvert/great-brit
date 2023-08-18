import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});

export default mongoose.model("Session", sessionSchema);
