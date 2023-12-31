import mongoose from "mongoose";

const starSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sentHome: {
    type: Boolean,
    default: false,
  },
});

const Star = mongoose.model("Star", starSchema);

export default Star;
