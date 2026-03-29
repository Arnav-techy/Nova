import { Signal } from "../models/signal.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/apiError.js";

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

/**
 * Fetch ticker signals from MongoDB, format them, and get insights from Google Gemini.
 * @param {string} ticker - The stock ticker to analyze.
 * @returns {Promise<string>} The AI-generated insight.
 */
export const getGeminiInsight = async (ticker) => {
    if (!ticker) {
        throw new ApiError(400, "Ticker is required");
    }

    // 1. Fetch ticker signals from MongoDB
    const query = { ticker: ticker.toUpperCase() };

    // Get the most recent signal for the ticker
    const signal = await Signal.findOne(query).sort({ createdAt: -1 });

    if (!signal) {
        throw new ApiError(404, `No signals found for ticker ${ticker}`);
    }

    // 2. Format them into a structured prompt
    const signalData = {
        ticker: signal.ticker,
        mentions: signal.mentions,
        engagement: signal.engagement,
        topPosts: signal.sentimentSummary || []
    };

    const topDiscussionsText = signalData.topPosts
        .map((post, index) => `${index + 1}. ${post}`)
        .join("\n");

    const prompt = `You are a financial intelligence assistant.

Analyze the following retail investor signals for a stock ticker.

Ticker: ${signalData.ticker}
Mentions: ${signalData.mentions}
Total Engagement: ${signalData.engagement}
Top Discussions:
${topDiscussionsText}

Provide:
1. Market narrative
2. Retail sentiment
3. Potential risk signals
4. Short-term outlook`;

    // 3. Send the prompt to Google Gemini
    try {
        const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_ID || "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // 4. Return an AI-generated insight
        const insight = response.text();
        return insight;
    } catch (error) {
        console.error("Error communicating with Google Gemini:", error);
        throw new ApiError(500, "Failed to generate insight from Google Gemini");
    }
};
