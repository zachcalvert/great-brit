import User from "../../models/User.js";
import Session from "../../models/Session.js";

export const authenticateUser = async (req, res, next) => {
  const sessionToken = req.headers.authorization?.split(" ")[1];

  try {
    const session = await Session.findOne({ token: sessionToken });

    if (!session || session.expiresAt < Date.now()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const sessionUser = await User.findOne({ _id: session.userId });

    if (!sessionUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.sessionUser = sessionUser; // Attach the authenticated user to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
