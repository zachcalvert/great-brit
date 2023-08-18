import mongoose from "mongoose";

const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User model for association
  },
  token: String, // You can store a session token or any identifier here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Session", sessionSchema);
