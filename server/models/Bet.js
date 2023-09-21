import mongoose from "mongoose";

const { Schema } = mongoose;

const eligibleUserSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
});

const betSchema = new mongoose.Schema({
  id: String,
  description: String,
  better: {
    id: String,
    firstName: String,
    lastName: String,
  },
  odds: Number,
  maxLose: Number,
  eligibleUsers: [eligibleUserSchema],
  acceptedUsers: [eligibleUserSchema],
  episode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Episode",
    required: false,
  },
});

export default mongoose.model("Bet", betSchema);
