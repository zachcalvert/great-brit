import mongoose from "mongoose";
import Episode from "../../models/Episode.js";
import Event from "../../models/Event.js";
import Bet from "../../models/Bet.js";
// import { v4 as uuidv4 } from "uuid";
import { authenticateUser } from "./authMiddleware.js";

const episodeRoutes = (router) => {
  // Get all episodes
  router.get("/episodes", async (req, res) => {
    try {
      const episodes = await Episode.find();
      res.json({ episodes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create a new episode
  router.post("/episodes", async (req, res) => {
    const { number, hasAired } = req.body;

    try {
      const newEpisode = new Episode({
        number,
        hasAired,
      });

      const savedEpisode = await newEpisode.save();
      res.status(201).json({ episode: savedEpisode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all events for a specific episode
  router.get(
    "/episodes/:episodeId/events",

    async (req, res) => {
      const { episodeId } = req.params;

      try {
        const events = await Event.find({ episode: episodeId }).populate(
          "star"
        );

        res.json({ events });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

  // Get all bets for a specific episode
  router.get(
    "/episodes/:episodeId/bets",

    async (req, res) => {
      const { episodeId } = req.params;

      try {
        const bets = await Bet.find({ episode: episodeId });

        res.json({ bets });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

  // Create a new event for a specific episode
  router.post(
    "/episodes/:episodeId/events",

    async (req, res) => {
      const { episodeId } = req.params;
      const { description, time, baseAmount, starId } = req.body;

      try {
        // Check if the episode exists
        const episode = await Episode.findById(episodeId);

        if (!episode) {
          return res.status(404).json({ message: "Episode not found" });
        }

        const newEvent = new Event({
          description,
          time,
          baseAmount,
          star: starId,
          episode: episodeId,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ event: savedEvent });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

  return router;
};

export default episodeRoutes;
