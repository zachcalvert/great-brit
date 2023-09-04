import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  description: String,
  time: {
    type: String,
    required: false,
  },
  baseAmount: Number,
  star: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Star",
    required: false,
  },
});

export default mongoose.model("Event", eventSchema);
