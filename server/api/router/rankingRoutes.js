import Star from "../../models/Star.js";
import Ranking from "../../models/Ranking.js";
import Session from "../../models/Session.js";
import { authenticateUser } from "./authMiddleware.js";

const rankingsRoutes = (router) => {
  router.get("/rankings", async (req, res) => {
    try {
      const sessionToken = req.headers.authorization.split(" ")[1];
      const session = await Session.findOne({ token: sessionToken });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let userRankings = await Ranking.find({ userId: session.userId })
        .populate("starId") // Populate the related Star data
        .sort({ rank: 1 }); // Sort the rankings by rank

      const stars = await Star.find();

      if (userRankings.length !== stars.length) {
        // Get the user's current rankings
        const userRankings = await Ranking.find({
          userId: session.userId,
        }).populate("starId");

        // Get the IDs of stars that the user has ranked
        const rankedStarIds = userRankings
          .map((ranking) => ranking.starId?._id?.toString()) // Use optional chaining to handle null values
          .filter((id) => id !== null); // Remove null values

        // Identify the stars that were added and removed
        const starsToAdd = stars.filter(
          (star) => !rankedStarIds.includes(star._id.toString())
        );

        const starsToRemove = userRankings.filter((ranking) => {
          if (!ranking.starId) {
            return true; // Remove if starId is null or undefined
          }

          const rankingStarId = ranking.starId._id?.toString(); // Handle null or undefined _id
          return (
            !rankingStarId ||
            !stars.some((star) => star._id.toString() === rankingStarId)
          );
        });

        // Remove rankings for stars that no longer exist
        const removePromises = starsToRemove.map((ranking) =>
          Ranking.findByIdAndRemove(ranking._id)
        );

        // Create new rankings for stars that were added
        const newRankings = starsToAdd.map((star, index) => {
          return new Ranking({
            userId: session.userId,
            starId: star._id,
            rank: userRankings.length + index + 1, // Add new rankings at the end
          });
        });

        // Use Promise.all to remove old rankings and create new ones
        await Promise.all([
          ...removePromises,
          ...newRankings.map((ranking) => ranking.save()),
        ]);

        // Fetch the updated user rankings
        const updatedUserRankings = await Ranking.find({
          userId: session.userId,
        })
          .populate("starId")
          .sort({ rank: 1 });

        // Return the updated rankings
        res.json({ rankings: updatedUserRankings });
      } else {
        res.json({ rankings: userRankings });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/rankings", async (req, res) => {
    const sessionToken = req.headers.authorization.split(" ")[1];
    const { rankings } = req.body;

    try {
      const session = await Session.findOne({ token: sessionToken });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = session.userId;

      // Remove existing rankings for the user
      await Ranking.deleteMany({ userId });

      // Create new rankings for the user
      const rankingPromises = rankings.map(async (rankedStar) => {
        const star = await Star.findOne({ _id: rankedStar.starId });
        if (!star) {
          return null;
        }
        return new Ranking({
          userId,
          starId: star._id,
          rank: rankedStar.rank,
        }).save();
      });

      const newRankings = await Promise.all(rankingPromises);
      const savedRankings = newRankings.filter((ranking) => ranking !== null);

      // Populate the related Star data for each ranking
      const populatedRankings = await Ranking.find({ userId })
        .populate("starId")
        .sort({ rank: 1 });

      res.status(201).json({ rankings: populatedRankings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};

export default rankingsRoutes;
