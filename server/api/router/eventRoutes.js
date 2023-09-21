import mongoose from "mongoose";
import Event from "../../models/Event.js";
import Episode from "../../models/Episode.js"; // Import Episode model
// import { v4 as uuidv4 } from "uuid";
import Star from "../../models/Star.js";
import Session from "../../models/Session.js";
import { authenticateUser } from "./authMiddleware.js";

const eventRoutes = (router) => {
  router.get("/events", async (req, res) => {
    try {
      const events = await Event.find().populate("star");

      res.json({ events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/events", async (req, res) => {
    const { description, time, baseAmount, starId, episodeId } = req.body;
    const sessionToken = req.headers.authorization.split(" ")[1];
    // const stars = await Star.find({}, "_id");

    try {
      const session = await Session.findOne({ token: sessionToken });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!mongoose.Types.ObjectId.isValid(starId)) {
        return res.status(400).json({ message: "Invalid starId" });
      }

      const star = await Star.findOne({ _id: starId });

      if (!star) {
        return res.status(404).json({ message: "Star not found" });
      }

      const newEvent = new Event({
        description,
        time,
        baseAmount,
        star: starId,
      });

      const savedEvent = await newEvent.save();

      // Add the event to the associated episode
      if (episodeId) {
        const episode = await Episode.findOne({ _id: episodeId });

        if (episode) {
          episode.events.push(savedEvent._id);
          await episode.save();
        }
      }

      const out = await savedEvent.populate("star");
      res.status(201).json({ event: out });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};

export default eventRoutes;
