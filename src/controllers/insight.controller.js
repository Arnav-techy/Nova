import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { getNovaInsight } from "../services/nova.service.js";

const getTickerInsight = asyncHandler(async (req, res) => {
    const { ticker } = req.params;

    if (!ticker) {
        throw new ApiError(400, "Ticker is required");
    }

    try {
        const insight = await getNovaInsight(ticker);

        return res
            .status(200)
            .json(new ApiResponse(200, { ticker, insight }, "Insight generated successfully"));
    } catch (error) {
        // Let ApiError fall through, otherwise wrap it
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, `Error generating insight: ${error.message}`);
    }
});

export { getTickerInsight };
