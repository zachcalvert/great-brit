import Bet from "../../models/Bet.js";
import { v4 as uuidv4 } from "uuid";
import User from "../../models/User.js";
import Session from "../../models/Session.js";
import Episode from "../../models/Episode.js";
import { authenticateUser } from "./authMiddleware.js";

const betRoutes = (router) => {
  router.get("/bets", async (req, res) => {
    try {
      const bets = await Bet.find();
      res.json({ bets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/bets", async (req, res) => {
    const { description, odds, maxLose, eligibleUsers } = req.body;

    const sessionToken = req.headers.authorization.split(" ")[1];

    try {
      const session = await Session.findOne({ token: sessionToken });
      const sessionUser = await User.findOne({ _id: session.userId });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userPromises = eligibleUsers.map(async (userId) => {
        const user = await User.findOne({ _id: userId });
        return user ? user.toObject() : null;
      });

      const users = await Promise.all(userPromises);

      const episodes = await Episode.find({}).sort({ number: -1 }).limit(1);

      const latestEpisode = episodes[0];

      const newBet = new Bet({
        id: uuidv4(),
        description,
        odds,
        better: sessionUser,
        maxLose,
        eligibleUsers: users,
        episode: latestEpisode._id,
      });

      const savedBet = await newBet.save();

      if (latestEpisode) {
        latestEpisode.bets.push(savedBet._id);
        await latestEpisode.save();
      }

      res.status(201).json({ bet: savedBet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
};

export default betRoutes;
