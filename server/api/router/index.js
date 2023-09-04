import { Router } from "express";
import roomRoutes from "./roomRoutes.js";
import userRoutes from "./userRoutes.js";
import betRoutes from "./betRoutes.js";
import starRoutes from "./starRoutes.js";
import rankingRoutes from "./rankingRoutes.js";
import eventRoutes from "./eventRoutes.js";

let router = new Router();

router = roomRoutes(router);
router = eventRoutes(router);
router = userRoutes(router);
router = betRoutes(router);
router = starRoutes(router);
router = rankingRoutes(router);

export default router;
