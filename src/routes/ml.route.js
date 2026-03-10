import { Router } from "express";
import { getSentimentScore, getMentionVelocity, getEngagementScore } from "../controllers/ml.controller.js";

const router = Router();

router.route("/sentiment/:ticker").get(getSentimentScore);
router.route("/velocity/:ticker").get(getMentionVelocity);
router.route("/engagement/:ticker").get(getEngagementScore);

export default router;
