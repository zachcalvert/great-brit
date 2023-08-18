import { Router } from "express";
import roomRoutes from "./roomRoutes.js";
import userRoutes from "./userRoutes.js";

let router = new Router();

router = roomRoutes(router);
router = userRoutes(router);

export default router;
