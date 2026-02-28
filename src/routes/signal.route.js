import { Router } from "express";
import { triggerAggregation, getSignals } from "../controllers/signal.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Secure all signal routes
router.use(verifyJWT);

// Trigger aggregation process
router.route("/aggregate").post(triggerAggregation);

// Get the processed Signals
router.route("/").get(getSignals);

export default router;
