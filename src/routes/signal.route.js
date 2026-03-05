import { Router } from "express";
import { triggerAggregation, getSignals } from "../controllers/signal.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Public: Get the processed Signals (no auth needed for landing page)
router.route("/").get(getSignals);

// Secure routes below
router.use(verifyJWT);

// Trigger aggregation process (requires auth)
router.route("/aggregate").post(triggerAggregation);

export default router;
