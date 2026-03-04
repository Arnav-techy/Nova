import { Router } from "express";
import { getTickerInsight } from "../controllers/insight.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Secure all insight routes
router.use(verifyJWT);

// Get insight for a specific ticker
router.route("/:ticker").get(getTickerInsight);

export default router;
