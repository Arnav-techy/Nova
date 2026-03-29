import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { aggregateDailyData } from "../services/aggregation.service.js";
import { Signal } from "../models/signal.model.js";

const triggerAggregation = asyncHandler(async (req, res) => {
    // Optionally accept a date string, otherwise default to today
    let { date } = req.body;

    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    try {
        const result = await aggregateDailyData(date);

        return res
            .status(200)
            .json(new ApiResponse(200, result, "Aggregation triggered successfully"));
    } catch (error) {
        throw new ApiError(500, `Error during aggregation: ${error.message}`);
    }
});

const getSignals = asyncHandler(async (req, res) => {
    let { date, limit = 10 } = req.query;

    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    let signals = await Signal.find({ date })
        .sort({ engagement: -1 })
        .limit(parseInt(limit));

    // Fallback: if no signals for the requested date, get the most recent ones
    if (!signals.length) {
        signals = await Signal.find({})
            .sort({ date: -1, engagement: -1 })
            .limit(parseInt(limit));
    }

    if (!signals.length) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], "No signals found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, signals, "Signals fetched successfully"));
});

export { triggerAggregation, getSignals };
