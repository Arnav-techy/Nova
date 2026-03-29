import { Router } from "express";
import { getPrediction } from "../controllers/prediction.controller.js";

const router = Router();

router.route("/:ticker").get(getPrediction);

export default router;
