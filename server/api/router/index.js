import { Router } from "express";
import roomRoutes from "./roomRoutes.js";
import userRoutes from "./userRoutes.js";
import betRoutes from "./betRoutes.js";

let router = new Router();

router = roomRoutes(router);
router = userRoutes(router);
router = betRoutes(router);

export default router;
