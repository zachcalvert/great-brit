import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  number: Number,
  hasAired: Boolean,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("Episode", episodeSchema);
