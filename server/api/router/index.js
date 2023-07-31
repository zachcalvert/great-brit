import { Router } from "express";
import Room from "../../models/Room.js";
import User from "../../models/User.js";
import roomRoutes from "./roomRoutes.js";
import userRoutes from "./userRoutes.js";

let router = new Router();

router = roomRoutes(router);
router = userRoutes(router);

export default router;
