import { Signal } from "../models/signal.model.js";
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { ApiError } from "../utils/apiError.js";

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || "us-east-1" });

/**
 * Fetch ticker signals from MongoDB, format them, and get insights from Amazon Nova.
 * @param {string} ticker - The stock ticker to analyze.
 * @returns {Promise<string>} The AI-generated insight.
 */
export const getNovaInsight = async (ticker) => {
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

    // 3. Send the prompt to Amazon Nova via Bedrock
    const modelId = process.env.NOVA_MODEL_ID || "amazon.nova-pro-v1:0";

    const command = new ConverseCommand({
        modelId,
        messages: [
            {
                role: "user",
                content: [
                    {
                        text: prompt
                    }
                ]
            }
        ]
    });

    try {
        const response = await client.send(command);

        // 4. Return an AI-generated insight
        const insight = response.output.message.content[0].text;
        return insight;
    } catch (error) {
        console.error("Error communicating with Amazon Bedrock:", error);
        throw new ApiError(500, "Failed to generate insight from Amazon Nova");
    }
};
