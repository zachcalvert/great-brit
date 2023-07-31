import Room from "../../models/Room.js";

const roomRoutes = (router) => {
  router.get("/rooms", async (req, res) => {
    const rooms = await Room.find();
    res.json({ rooms });
  });

  return router;
};

export default roomRoutes;
