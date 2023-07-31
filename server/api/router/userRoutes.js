import User from "../../models/User.js";
import bcrypt from "bcrypt";

const userRoutes = (router) => {
  router.get("/users", async (req, res) => {
    const users = await User.find();

    // await User.deleteMany();

    res.json({ users });
  });

  router.post("/users", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(
      "🚀 ~ file: userRoutes.js:15 ~ router.post ~ req.body:",
      req.body
    );

    // todo: bcrypt password
    const user = await new User({
      firstName,
      lastName,
      email,
      password,
    });
    user.save();

    res.json({ user });
  });

  router.patch("/users", async (req, res) => {
    const { _id, firstName, lastName, email } = req.query;
    const user = await User.findOneAndUpdate(
      { _id },
      { firstName, lastName, email }
    );

    res.json({ user });
  });

  return router;
};

export default userRoutes;
