import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomId: String,
  name: String,
  userId: String,
});

export default mongoose.model("Room", roomSchema);
